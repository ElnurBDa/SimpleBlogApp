# Stage 1
FROM node:23-alpine AS builder

WORKDIR /app

ARG REACT_APP_BACK_API
ENV REACT_APP_BACK_API=${REACT_APP_BACK_API}

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2
FROM nginx:alpine

COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

