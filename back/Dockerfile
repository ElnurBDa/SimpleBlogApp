FROM oven/bun:latest

WORKDIR /app

COPY package.json bun.lockb ./

RUN bun install

COPY . .

EXPOSE ${PORT}

RUN bun prisma migrate dev -n any

CMD bun src/index.ts 
