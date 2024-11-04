import { BlogPost } from "@prisma/client";

export interface IDbService {
    getAllBlogPosts(): Promise<BlogPost[]>;
    getBlogPostById(id: string): Promise<BlogPost | null>;
    createBlogPost(data: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>): Promise<BlogPost>;
    updateBlogPost(id: string, data: Partial<BlogPost>): Promise<BlogPost>;
    deleteBlogPost(id: string): Promise<BlogPost>;
}