FROM node:20-alpine
WORKDIR /app
COPY ./app/package*.json ./
RUN echo "package copied"
RUN npm ci
COPY app/ .
EXPOSE 3000
CMD ["node", "server.js"]