import { Elysia } from "elysia";
import { swagger } from '@elysiajs/swagger'
import cors from "@elysiajs/cors";

export const getBaseApp = () => {
    return new Elysia()
        .use(swagger())
        .use(cors({
            origin: "*",
            methods: ["GET", "POST", "PUT", "DELETE"],
        }))
        .get("/", () => "Nothing to see here")
}