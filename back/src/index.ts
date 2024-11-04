import { t } from "elysia";
import { BlogPostModel } from "./lib/models/blogpost.model";
import { getBaseApp } from "./lib/base";
import { DbService } from "./lib/db.service";

export const app = getBaseApp()
  .decorate("dbService", new DbService())
  .group("blogposts", (app) => app
    .get("/", ({ dbService }) => {
      return dbService.getAllBlogPosts();
    }, {
      response: t.Array(BlogPostModel)
    })
    .get("/:id", ({ dbService, params }) => {
      return dbService.getBlogPostById(params.id);
    }, {
      params: t.Object({
        id: t.String()
      }),
      response: t.Nullable(BlogPostModel)
    })
    .post("/", ({ dbService, body }) => {
      return dbService.createBlogPost(body);
    }, {
      body: BlogPostModel,
      response: BlogPostModel
    })
    .put("/:id", ({ dbService, body, params }) => {
      return dbService.updateBlogPost(params.id, body);
    }, {
      body: BlogPostModel,
      response: BlogPostModel,
      params: t.Object({
        id: t.String()
      })
    })
    .delete("/:id", ({ dbService, params }) => {
      return dbService.deleteBlogPost(params.id);
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
