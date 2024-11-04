import { describe, it, expect, beforeEach } from 'bun:test';
import { IDbService } from '../src/lib/interfaces/i_dbservice';
import { BlogPost } from '@prisma/client';
import { app } from '../src';
import Elysia from 'elysia';

class StubDbService implements IDbService {
    private blogPosts: BlogPost[] = [];

    async getAllBlogPosts(): Promise<BlogPost[]> {
        return this.blogPosts;
    }

    async getBlogPostById(id: string): Promise<BlogPost | null> {
        return this.blogPosts.find(post => post.id === id) || null;
    }

    async createBlogPost(data: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>): Promise<BlogPost> {
        const newPost: BlogPost = {
            ...data,
            id: (this.blogPosts.length + 1).toString(),
            createdAt: new Date(),
            updatedAt: new Date()
        };
        this.blogPosts.push(newPost);
        return newPost;
    }

    async updateBlogPost(id: string, data: Partial<BlogPost>): Promise<BlogPost> {
        const index = this.blogPosts.findIndex(post => post.id === id);
        if (index === -1) throw new Error('BlogPost not found');
        this.blogPosts[index] = { ...this.blogPosts[index], ...data, updatedAt: new Date() };
        return this.blogPosts[index];
    }

    async deleteBlogPost(id: string): Promise<BlogPost> {
        const index = this.blogPosts.findIndex(post => post.id === id);
        if (index === -1) throw new Error('BlogPost not found');
        const [deletedPost] = this.blogPosts.splice(index, 1);
        return deletedPost;
    }
}

const url = `http://${app.server?.hostname}:${app.server?.port}`
describe('BlogPost API', () => {
    const dbService = new StubDbService();
    const testApp = new Elysia().decorate("dbService", dbService).use(app)

    it('should get all blog posts', async () => {
        const response = await testApp.handle(new Request(`${url}/blogposts`));
        const json = await response.json();
        expect(response.status).toBe(200);
        expect(json).toEqual([]);
    });

    it('should create a new blog post', async () => {
        const newPost = { title: 'Test Post', content: 'This is a test post' };
        const response = await testApp.handle(new Request(`${url}/blogposts`, {
            method: 'POST',
            body: JSON.stringify(newPost),
            headers: { 'Content-Type': 'application/json' }
        }));
        const json = await response.json();
        expect(response.status).toBe(200);
        expect(json).toMatchObject({
            ...newPost,
            createdAt: expect.any(String),
            updatedAt: expect.any(String)
        });
    });

    it('should get a blog post by id', async () => {
        const newPost = await dbService.createBlogPost({ title: 'Test Post', content: 'This is a test post' });
        const response = await testApp.handle(new Request(`${url}/blogposts/${newPost.id}`));
        const json = await response.json();
        expect(response.status).toBe(200);
        expect(json).toMatchObject({
            ...newPost,
            createdAt: newPost.createdAt.toISOString(),
            updatedAt: newPost.updatedAt.toISOString()
        });
    });

    it('should update a blog post', async () => {
        const newPost = await dbService.createBlogPost({ title: 'Test Post', content: 'This is a test post' });
        const updatedData = { title: 'Updated Post', content: 'Updated content' }; // Ensure all required fields are provided
        const response = await testApp.handle(new Request(`${url}/blogposts/${newPost.id}`, {
            method: 'PUT',
            body: JSON.stringify(updatedData),
            headers: { 'Content-Type': 'application/json' }
        }));
        const json = await response.json();
        expect(response.status).toBe(200);
        expect(json).toMatchObject({
            ...newPost,
            ...updatedData,
            createdAt: newPost.createdAt.toISOString(),
            updatedAt: expect.any(String)
        });
    });

    it('should delete a blog post', async () => {
        const newPost = await dbService.createBlogPost({ title: 'Test Post', content: 'This is a test post' });
        const response = await testApp.handle(new Request(`${url}/blogposts/${newPost.id}`, {
            method: 'DELETE'
        }));
        const json = await response.json();
        expect(response.status).toBe(200);
        expect(json).toMatchObject({
            ...newPost,
            createdAt: newPost.createdAt.toISOString(),
            updatedAt: newPost.updatedAt.toISOString()
        });
    });

    it('should return 422 for invalid blog post data', async () => { // Adjusted to match the actual response status
        const invalidPost = { title: '' }; // Missing required fields
        const response = await testApp.handle(new Request(`${url}/blogposts`, {
            method: 'POST',
            body: JSON.stringify(invalidPost),
            headers: { 'Content-Type': 'application/json' }
        }));
        expect(response.status).toBe(422);
    });
});
