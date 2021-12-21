FROM node:12

WORKDIR /usr/atelier1

COPY . .

RUN npm i

EXPOSE 3000

CMD ["npm","start"]
