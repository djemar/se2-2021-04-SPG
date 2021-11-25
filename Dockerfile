FROM node:14.17.5

WORKDIR /app

COPY . .

RUN cd server && npm install

WORKDIR /app

RUN cd client && npm install

EXPOSE 3000 3001

WORKDIR /app
CMD ["sh", "start.sh"]
