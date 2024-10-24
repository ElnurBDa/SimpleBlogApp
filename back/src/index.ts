import { Elysia, t } from "elysia";
import { swagger } from '@elysiajs/swagger'
import { prisma } from "./lib/db";
import { BlogPostModel } from "./lib/models/blogpost.model";
import cors from "@elysiajs/cors";

export const app = new Elysia()
  .use(swagger())
  .use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  }))
  .decorate("dbService", prisma)
  .get("/", () => "Nothing to see here")
  .group("blogposts", (app) => app
    .get("/", ({ dbService }) => {
      return dbService.blogPost.findMany()
    }, {
      response: t.Array(BlogPostModel)
    })
    .get("/:id", ({ dbService, params }) => {
      return dbService.blogPost.findUnique({
        where: {
          id: params.id
        }
      })
    }, {
      params: t.Object({
        id: t.String()
      }),
      response: t.Nullable(BlogPostModel)
    })
    .post("/", ({ dbService, body }) => {
      return dbService.blogPost.create({
        data: body
      })
    }, {
      body: BlogPostModel,
      response: BlogPostModel
    })
    .put("/:id", ({ dbService, body, params }) => {
      return dbService.blogPost.update({
        where: {
          id: params.id
        },
        data: body
      })
    }, {
      body: BlogPostModel,
      response: BlogPostModel,
      params: t.Object({
        id: t.String()
      })
    })
    .delete("/:id", ({ dbService, params }) => {
      return dbService.blogPost.delete({
        where: {
          id: params.id
        }
      })
    }, {
      params: t.Object({
        id: t.String()
      }),
      response: BlogPostModel
    })
  )
  .listen(Bun.env.PORT || 3001);

console.log(
  `http://${app.server?.hostname}:${app.server?.port}`
);
