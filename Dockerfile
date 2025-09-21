# Stage 1: build
FROM node:24-alpine AS builder
WORKDIR /app

COPY myrecipebook/ .
RUN yarn install

CMD ["yarn", "dev", "--host", "--port", "5173"]

