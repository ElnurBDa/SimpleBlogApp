import { BlogPost } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import { IDbService } from "./interfaces/i_dbservice";

export class DbService implements IDbService {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async getAllBlogPosts() {
        return this.prisma.blogPost.findMany();
    }

    async getBlogPostById(id: string) {
        return this.prisma.blogPost.findUnique({
            where: { id },
        });
    }

    async createBlogPost(data: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>) {
        return this.prisma.blogPost.create({
            data,
        });
    }

    async updateBlogPost(id: string, data: Partial<BlogPost>) {
        return this.prisma.blogPost.update({
            where: { id },
            data,
        });
    }

    async deleteBlogPost(id: string) {
        return this.prisma.blogPost.delete({
            where: { id },
        });
    }
}