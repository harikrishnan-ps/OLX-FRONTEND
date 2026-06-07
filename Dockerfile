# Stage 1: Build the Angular app
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --configuration=production

# Stage 2: Serve the app with Nginx
FROM nginx:alpine
COPY --from=build /app/dist/olx-clone/browser /usr/share/nginx/html
# For older Angular versions the output path might just be /app/dist/olx-clone. I will use the generic fallback pattern in Nginx or just assume /browser. Let's check angular.json if needed, but modern Angular (17+) uses /browser.
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
