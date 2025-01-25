# CONFIG
FROM node:20-alpine
LABEL authors="Voikyrioh"
WORKDIR /app

# Requirements
COPY package.json /app
RUN npm i --only-prod

# Source files
COPY src /app/src
EXPOSE 8080

# RUN
CMD ["node", "src/server.mjs"]
