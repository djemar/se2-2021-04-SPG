
FROM node:16.13.0-alpine AS client
WORKDIR /usr/src/app
COPY client/ ./client/
RUN cd client && npm install && npm run build

FROM node:16.13.0-alpine AS server
# WORKDIR /
# RUN git clone https://github.com/wolfcw/libfaketime.git
# WORKDIR /libfaketime/src
# RUN make install
WORKDIR /root/
COPY --from=client /usr/src/app/client/build ./client/build
COPY server/package*.json .
RUN npm upgrade
RUN npm install
COPY server/server.js .
COPY server/.env .
COPY server/dao.js .
COPY server/user.js .
COPY server/SPG.sqlite .
RUN ls

ENV BOT_SECRET_TOKEN='5018717337:AAE4tIYI2bZxJazDkVxoS56A2uMQpHUG4YI'

#ENV LD_PRELOAD=/usr/local/lib/faketime/libfaketime.so.1
#ENV DONT_FAKE_MONOTONIC=1

EXPOSE 3001

CMD ["node", "server.js"]