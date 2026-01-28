# This base stage ensures all other stages are using the same base image
FROM node:24-alpine AS base
WORKDIR /usr/local/app

FROM base AS final
ENV NODE_ENV=production
COPY --from=test /usr/local/app/package.json ./
RUN npm ci --production && \
    npm cache clean --force
COPY server/src ./src
COPY --from=front-build /usr/local/app/dist ./src/static
EXPOSE 3000
CMD ["node", "src/index.js"]