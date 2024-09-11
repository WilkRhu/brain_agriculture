FROM node:20 AS build

WORKDIR /

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20 AS production

WORKDIR /

COPY --from=build /dist ./dist

COPY --from=build /node_modules ./node_modules

COPY package*.json ./

ENV NODE_ENV=prod

EXPOSE 3001


CMD ["node", "dist/src/main"]