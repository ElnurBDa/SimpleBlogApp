import { describe, it, expect, beforeAll, afterAll } from "bun:test";
import { prisma } from "../src/lib/db";
import { app } from "../src";

let server;

beforeAll(async () => {
    server = app.listen(3001);
});

afterAll(async () => {
    await prisma.$disconnect();
});

describe("BlogPost API", () => {
    it("should return a welcome message on GET /", async () => {
        const response = await fetch("http://localhost:3001/");
        const text = await response.text();
        expect(response.status).toBe(200);
        expect(text).toBe("Nothing to see here");
    });

    it("should return an array of blog posts on GET /blogposts", async () => {
        const response = await fetch("http://localhost:3001/blogposts");
        const json = await response.json();
        expect(response.status).toBe(200);
        expect(Array.isArray(json)).toBe(true);
    });

    it("should create a new blog post on POST /blogposts", async () => {
        const newPost = {
            title: "Test Post",
            content: "This is a test post",
        };
        const response = await fetch("http://localhost:3001/blogposts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newPost),
        });
        const json = await response.json();
        expect(response.status).toBe(200);
        expect(json).toMatchObject(newPost);
    });

    it("should return a blog post by ID on GET /blogposts/:id", async () => {
        const post = await prisma.blogPost.create({
            data: {
                title: "Test Post",
                content: "This is a test post",
            },
        });
        const response = await fetch(`http://localhost:3001/blogposts/${post.id}`);
        const json = await response.json();
        expect(response.status).toBe(200);
        expect(json).toMatchObject({
            ...post,
            createdAt: post.createdAt.toISOString(),
            updatedAt: post.updatedAt.toISOString(),
        });
    });

    it("should update a blog post on PUT /blogposts/:id", async () => {
        const post = await prisma.blogPost.create({
            data: {
                title: "Test Post",
                content: "This is a test post",
            },
        });
        const updatedPost = {
            title: "Updated Test Post",
            content: "This is an updated test post",
        };
        const response = await fetch(`http://localhost:3001/blogposts/${post.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedPost),
        });
        const json = await response.json();
        expect(response.status).toBe(200);
        expect(json).toMatchObject(updatedPost);
    });

    it("should delete a blog post on DELETE /blogposts/:id", async () => {
        const post = await prisma.blogPost.create({
            data: {
                title: "Test Post",
                content: "This is a test post",
            },
        });
        const response = await fetch(`http://localhost:3001/blogposts/${post.id}`, {
            method: "DELETE",
        });
        const json = await response.json();
        expect(response.status).toBe(200);
        expect(json).toMatchObject({
            ...post,
            createdAt: post.createdAt.toISOString(),
            updatedAt: post.updatedAt.toISOString(),
        });
    });
});