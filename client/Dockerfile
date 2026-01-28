FROM node:24-alpine AS base
WORKDIR /usr/local/app

# This stage is used as the base for the client-dev and client-build stages,
FROM base AS client-base
COPY package*.json ./
RUN npm install
COPY . .

# This stage is used for development of the client application. It sets 
FROM client-base AS client-dev
CMD ["npm", "run", "dev"]

# This stage builds the client application, producing static HTML, CSS, and
FROM client-base AS client-build
RUN npm run build