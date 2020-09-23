# build stage
FROM node:lts-alpine as build-stage

# install pnpm package manager
RUN npm install -g pnpm

# setup working directory
WORKDIR /app

# copy package.json & pnpm-lock.yaml
COPY package.json ./
COPY pnpm-lock.yaml ./

# run install
RUN pnpm install

# copy all file
COPY . .

# build web application
RUN pnpm build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]