FROM node:15.3.0-alpine as builder

WORKDIR /app
COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install

COPY . .

RUN npm run build

# build nginx
FROM nginx:1.19-alpine

COPY --from=0 /app/build/ /usr/share/nginx/html/
COPY default.conf /etc/nginx/conf.d/