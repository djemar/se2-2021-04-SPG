const express = require("express");
const morgan = require("morgan"); // logging middleware
const jwt = require("express-jwt");
const jsonwebtoken = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { body, param, check, validationResult,
  sanitizeBody, sanitizeParam } = require("express-validator"); // validation library
const dao = require("./dao.js");
const bcrypt = require("bcrypt");

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

// GET /products
// Request body: //
// Response body: json containing all the products of all categories
app.get("/api/products", async (req, res) => {
  await dao
    .getProducts()
    .then((products) => res.json(products))
    .catch((err) => res.status(503).json(dbErrorObj));
});

// POST /products
// Request body: category of the product
// Response body: json containing all the products of that category
app.post("/api/products", [check("category").isString()], async (req, res) => {
  console.log(req.body);
  await dao
    .getProductsByCategory(req.body.category)
    .then((products) => res.json(products))
    .catch((err) => res.status(503).json(dbErrorObj));
});

// POST /new-client
// Request body: json containing all the needed client data (name, surname, email, hash)
// Response body: json containing the new client just inserted
app.post("/api/new-client",
    body('name').exists({checkNull: true}).bail().notEmpty().bail().isString().bail(),
    body('surname').exists({checkNull: true}).bail().notEmpty().bail().isString().bail(),
    body('email').exists({checkNull: true}).bail().notEmpty().bail().isEmail().bail(),
    body('hash').exists({checkNull: true}).bail().notEmpty().bail().isString().bail(),
    async (req, res) => {
      console.log(req.body);
      const result = validationResult(req);
      if (!result.isEmpty())
        res.status(400).json({
          info: "The server cannot process the request",
          error: result.array()[0].msg,
          valueReceived: result.array()[0].value
        });
      else {
        await dao
            .insertClient(req.body)
            .then((client) => res.json(client))
            .catch((err) => res.status(503).json(dbErrorObj));
      }
});

const expireTime = 300; //seconds

app.listen(port, () =>
  console.log(`Server app listening at http://localhost:${port}`)
);
