import { t } from "elysia";

export const BlogPostModel = t.Object({
    id: t.Optional(t.String()),
    title: t.String(),
    content: t.String(),
    createdAt: t.Optional(t.Date()),
    updatedAt: t.Optional(t.Date()),
});
