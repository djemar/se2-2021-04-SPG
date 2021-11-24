FROM node:14.17.5

WORKDIR /app/server
COPY ./server .

WORKDIR /app/client
COPY ./client .

WORKDIR /app
COPY ./start.sh .

WORKDIR /app/server
RUN npm i
WORKDIR /app/client
RUN npm i

EXPOSE 3000 3001

WORKDIR /app
CMD ["sh", "start.sh"]
