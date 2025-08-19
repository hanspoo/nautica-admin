FROM node:22-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run generate 
RUN npm run build
RUN npm prune --omit=dev
COPY .env dist/apps/server


FROM node:22-alpine

COPY --from=0 /app/dist  /dist
COPY --from=0 /app/package.json  /dist
COPY --from=0 /app/node_modules  /dist/node_modules

WORKDIR /dist

CMD ["npm", "run", "start"]
