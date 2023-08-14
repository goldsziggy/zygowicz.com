FROM node:slim AS app

WORKDIR /tmp/app

COPY ./ ./

RUN npm install

RUN npm run build

ENTRYPOINT npm run start