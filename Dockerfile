# Stage 1: Build Phase
FROM node:24-alpine AS build

RUN corepack enable

WORKDIR /app

COPY package.json yarn.lock .yarnrc.yml ./
RUN yarn install --immutable

COPY . .
RUN yarn build

# Stage 2: Serve via Nginx
FROM nginx:alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy the build artifact from Stage 1
COPY --from=build /app/dist/my-angular-app/browser /usr/share/nginx/html

# Optional: Add custom NGINX config
# COPY nginx-custom.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
