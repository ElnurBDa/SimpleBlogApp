# A simple Blog App

## Functionalities

- create a post
- see other posts
- delete a post

## Tech Stack

- Frontend - `ReactJS` + `MUI`
- Backend - `ElysiaJS` + `BunJS` + `Prisma`
- DB - `PostgreSQL`

- All Components are Dockerized

## Running it

- setup enviromental variables in `.env`

```bash
docker compose up -d
# If it is your first deployment
sudo docker exec -it <back-container-id> bun prisma migrate dev

```

## Tests

```bash
cd back
bun test

cd ..

cd front
npm test
```

## Some Images

- Main Page

> ![alt text](images/main.png)

- Add a Post

> ![alt text](images/addpost.png)

- See a Post

> ![alt text](images/post.png)

- Bakend API's Swagger

> ![alt text](images/swagger.png)
