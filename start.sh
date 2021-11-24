#!/bin/sh
echo "Starting Server"
cd server
node server.js &

echo "Strarting Client"
cd ../client
npm start
