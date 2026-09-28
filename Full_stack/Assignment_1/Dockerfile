FROM mhart/alpine-node:latest

WORKDIR /app

RUN npm install express

COPY ./server.js /app

CMD ["node", "server.js"]