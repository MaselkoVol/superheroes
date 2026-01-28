FROM node:24-alpine AS base
WORKDIR /usr/local/app

FROM base AS server-dev
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "start:dev"]

FROM server-dev as server-test
RUN npm run start:test