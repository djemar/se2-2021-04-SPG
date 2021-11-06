const express = require("express");
const morgan = require("morgan"); // logging middleware
const jwt = require("express-jwt");
const jsonwebtoken = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { check, validationResult } = require("express-validator"); // validation library
//const dao = require("./dao.js");

const passport = require("passport"); // auth middleware
const LocalStrategy = require("passport-local").Strategy; // username and password for login
const session = require("express-session"); // enable sessions

const app = express();
const port = 3001;

// Disable x-powered-by to not disclose technologies used on a website
app.disable("x-powered-by");

// Set-up logging
app.use(morgan("tiny"));

// Process body content
app.use(express.json());

// DB error
const dbErrorObj = { errors: [{ param: "Server", msg: "Database error" }] };
// Authorization error
const authErrorObj = {
    errors: [{ param: "Server", msg: "Authorization error" }],
};

const expireTime = 300; //seconds

app.listen(port, () =>
    console.log(`Server app listening at http://localhost:${port}`)
);