FROM node:16.13.0 AS client
WORKDIR /usr/src/app
COPY client/ ./client/
RUN cd client && npm install && npm run build

FROM node:16.13.0 AS server
WORKDIR /root/
COPY --from=client /usr/src/app/client/build ./client/build
COPY server/package*.json .
RUN npm install
COPY server/server.js .
COPY server/dao.js .
COPY server/user.js .
COPY server/SPG.sqlite .
RUN ls

EXPOSE 3001

CMD ["node", "./server.js"]