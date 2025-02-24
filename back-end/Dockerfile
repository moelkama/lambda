FROM node:18

WORKDIR /app

COPY ./app/ /app

RUN npm install
RUN npm install -g nodemon

EXPOSE 3000

CMD ["nodemon", "index.js"]
# CMD ["node", "index.js"]
# CMD ["tail", "-f"]