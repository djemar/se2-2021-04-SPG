const express = require("express");
const morgan = require("morgan"); // logging middleware
const jwt = require("express-jwt");
const jsonwebtoken = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const {
  body,
  param,
  check,
  validationResult,
  sanitizeBody,
  sanitizeParam,
} = require("express-validator"); // validation library
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

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    function (username, password, done) {
      dao
        .getUser(username, password)
        .then((user) => {
          if (!user) {
            return done(null, false, {
              message: "Incorrect username and/or password.",
            });
          }
          return done(null, user);
        })
        .catch((err) => {
          return done(null, false, {
            message: "Incorrect username and/or password.",
          });
        });
    }
  )
);

// we serialize the user id and we store it in the session: the session is very small in this way
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// starting from the data in the session, we extract the current (logged-in) user
passport.deserializeUser((id, done) => {
  dao
    .getUserById(id)
    .then((user) => {
      done(null, user); // this will be available in req.user
    })
    .catch((err) => {
      done(err, null);
    });
});

// set up the session
app.use(
  session({
    // by default, Passport uses a MemoryStore to keep track of the sessions
    secret:
      "a secret sentence not to share with anybody and anywhere, used to sign the session ID cookie",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next();

  return res.status(401).json({ error: "not authenticated" });
};

/************** Login **************/

app.post(
  "/api/login",
  [check("email").isEmail(), check("password").isString()],
  function (req, res, next) {
    passport.authenticate("local", (err, user, info) => {
      if (err) return next(err);

      if (!user) {
        // display wrong login messages
        return res.status(401).json(info);
      }
      // success, perform the login
      req.login(user, (err) => {
        if (err) return next(err);
        // req.user contains the authenticated user, we send all the user info back
        // this is coming from userDao.getUser()
        console.log(req.user);
        return res.json(req.user);
      });
    })(req, res, next);
  }
);

// DELETE /login/current
// logout
app.delete("/api/login/current", isLoggedIn, (req, res) => {
  req.logout();
  res.end();
});

app.get("/api/login/current", (req, res) => {
  if (req.isAuthenticated()) {
    console.log(req.user);
    res.status(200).json(req.user);
  } else res.status(401).json({ error: "Unauthenticated user!" });
});

/************** Products **************/

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
  await dao
    .getProductsByCategory(req.body.category)
    .then((products) => res.json(products))
    .catch((err) => res.status(503).json(dbErrorObj));
});

// POST /products-by-date
// Request body: specific date
// Response body: json containing all the products that can be sold at that date and time
app.post("/api/products-by-date", [check("date").isString()], async (req, res) => {
    await dao
        .getProductsByDate(req.body.date)
        .then((products) => res.json(products))
        .catch((err) => res.status(503).json(dbErrorObj));
});

// POST /products-from-date
// Request body: starting date
// Response body: json containing all the products that can be sold from that date and time
app.post("/api/products-from-date", [check("date").isString()], async (req, res) => {
    await dao
        .getProductsFromDate(req.body.date)
        .then((products) => res.json(products))
        .catch((err) => res.status(503).json(dbErrorObj));
});

// POST /products-to-date
// Request body: ending date
// Response body: json containing all the products that can be sold until that date and time
app.post("/api/products-to-date", [check("date").isString()], async (req, res) => {
    await dao
        .getProductsToDate(req.body.date)
        .then((products) => res.json(products))
        .catch((err) => res.status(503).json(dbErrorObj));
});

// POST /products-between-dates
// Request body: starting date and ending date
// Response body: json containing all the products that can be sold from starting date to ending date
app.post("/api/products-between-dates",
    body("startDate")
        .exists({ checkNull: true })
        .bail()
        .notEmpty()
        .bail()
        .isString()
        .bail(),
    body("endDate")
        .exists({ checkNull: true })
        .bail()
        .notEmpty()
        .bail()
        .isString()
        .bail(),
 async (req, res) => {
     const result = validationResult(req);
     if (!result.isEmpty())
         res.status(400).json({
             info: "The server cannot process the request",
             error: result.array()[0].msg,
             valueReceived: result.array()[0].value,
         });
     else {
         await dao
             .getProductsBetweenDates(req.body.startDate, req.body.endDate)
             .then((products) => res.json(products))
             .catch((err) => res.status(503).json(dbErrorObj));
     }
});

/************** Users **************/

// POST /new-user
// Request body: json containing all the needed user data (name, surname, email, hash, Type)
// Response body: json containing the new user just inserted
app.post(
  "/api/new-user",
  body("name")
    .exists({ checkNull: true })
    .bail()
    .notEmpty()
    .bail()
    .isString()
    .bail(),
  body("surname")
    .exists({ checkNull: true })
    .bail()
    .notEmpty()
    .bail()
    .isString()
    .bail(),
  body("email")
    .exists({ checkNull: true })
    .bail()
    .notEmpty()
    .bail()
    .isEmail()
    .bail(),
  body("hash")
    .exists({ checkNull: true })
    .bail()
    .notEmpty()
    .bail()
    .isString()
    .bail(),
  body("Type")
    .exists({ checkNull: true })
    .bail()
    .notEmpty()
    .bail()
    .isString()
    .bail()
    .custom((value) => {
      return !(
        value !== "Client" &&
        value !== "Farmer" &&
        value !== "Employee" &&
        value !== "Manager"
      );
    })
    .bail(),
  body("address")
    .exists({ checkNull: true })
    .bail()
    .notEmpty()
    .bail()
    .isString()
    .bail(),
  body("phone")
    .exists({ checkNull: true })
    .bail()
    .notEmpty()
    .bail()
    .isString()
    .bail(),
  body("country")
    .exists({ checkNull: true })
    .bail()
    .notEmpty()
    .bail()
    .isString()
    .bail(),
  body("city")
    .exists({ checkNull: true })
    .bail()
    .notEmpty()
    .bail()
    .isString()
    .bail(),
  body("zip_code")
    .exists({ checkNull: true })
    .bail()
    .notEmpty()
    .bail()
    .isInt()
    .bail(),
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty())
      res.status(400).json({
        info: "The server cannot process the request",
        error: result.array()[0].msg,
        valueReceived: result.array()[0].value,
      });
    else {
      await dao
        .insertUser(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(503).json(dbErrorObj));
    }
  }
);

// GET /users
// Request body: //
// Response body: json containing all the users
app.get("/api/users", async (req, res) => {
  await dao
    .getAllUsers()
    .then((users) => res.json(users))
    .catch((err) => res.status(503).json(dbErrorObj));
});

/************** Orders **************/

// POST /order
// Request body: object describing an Order (order_id,ref_user,productList[{ref_product,quantity}],date_order,status(optional))
// Response body: empty
// Example of Request's Body: {"order_id": 1,"ref_user": 1,"productList": [{"ref_product":1,"quantity":1},{"ref_product": 3,"quantity": 3},{"ref_product": 5,"quantity": 1}], "date_order": "222"}
app.post(
  "/api/order",
  body("ref_user")
    .exists({ checkNull: true })
    .bail()
    .notEmpty()
    .bail()
    .isNumeric(),
  body("date_order").exists({ checkNull: true }).bail().notEmpty().bail(),
  body("productList").exists({ checkNull: true }).bail().notEmpty().bail(),
  async (req, res) => {
    const validation = validationResult(req);
    if (!validation.isEmpty()) {
      res.status(400).json({
        info: "The server cannot process the request",
        error: validation.array()[0].msg,
        valueReceived: validation.array()[0].value,
      });
    }
    const order = req.body;
    let productsIdList = order.productList;
    var id_array = [],
      quantity_array = [];
    productsIdList.forEach((obj) => {
      id_array.push(obj.pid);
      quantity_array.push(obj.quantity);
    });
    await dao
      .insertOrder(order, id_array, quantity_array)
      .then((result) => res.end())
      .catch((err) => res.status(503).json(dbErrorObj));
  }
);

// GET /orders
// Request body: //
// Response body: json containing all the orders of all the clients
app.get("/api/orders", async (req, res) => {
  await dao
    .getAllOrders()
    .then((orders) => res.json(orders))
    .catch((err) => res.status(503).json(dbErrorObj));
});

// GET /client-orders/:clientID
// Request parameters: clientID
// Request body: //
// Response body: json containing all the orders of a specific client
app.get(
  "/api/client-orders/:clientID",
  param("clientID")
    .exists({ checkNull: true })
    .bail()
    .notEmpty()
    .bail()
    .isInt()
    .bail()
    .custom((value, req) => {
      let regex = new RegExp(/^[1-9](\d*)/); // '\d' corresponds to '[0-9]'
      return regex.test(value);
    }),
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      console.log("Sanitizer-checks not passed.");
      res.status(400).json({
        info: "The server cannot process the request",
        error: result.array()[0].msg,
        valueReceived: result.array()[0].value,
      });
    } else
      await dao
        .getOrdersByClientId(req.params.clientID)
        .then((orders) => res.json(orders))
        .catch((err) => res.status(503).json(dbErrorObj));
  }
);

// POST /set-delivered-order
// Request body: orderID
// Response body: json containing the status of the request
app.post(
  "/api/set-delivered-order/",
  body("order_id").exists({ checkNull: true }).bail().notEmpty().bail(),
  async (req, res) => {
    const validation = validationResult(req);
    if (!validation.isEmpty()) {
      console.log("Sanitizer-checks not passed.");
      res.status(400).json({
        info: "The server cannot process the request",
        error: validation.array()[0].msg,
        valueReceived: validation.array()[0].value,
      });
    } else {
      await dao
        .setDeliveredOrder(req.body.order_id)
        .then((result) => res.json(result))
        .catch((err) => res.status(503).json(dbErrorObj));
    }
  }
);

// POST /recharge-wallet
// Request body: clientID and amount to recharge
// Response body: json containing the status of the request
app.post(
  "/api/recharge-wallet/",
  body("clientID").exists({ checkNull: true }).bail().notEmpty().bail(),
  body("recharge")
    .exists({ checkNull: true })
    .bail()
    .notEmpty()
    .bail()
    .isNumeric({ min: 0.0 })
    .bail(),
  async (req, res) => {
    const validation = validationResult(req);
    if (!validation.isEmpty()) {
      console.log("Sanitizer-checks not passed.");
      res.status(400).json({
        info: "The server cannot process the request",
        error: validation.array()[0].msg,
        valueReceived: validation.array()[0].value,
      });
    } else {
      await dao
        .updateClientWallet(req.body.clientID, req.body.recharge)
        .then((result) => res.json(result))
        .catch((err) => res.status(503).json(dbErrorObj));
    }
  }
);

app.post(
    "/api/new-user",
    body("name")
        .exists({ checkNull: true })
        .bail()
        .notEmpty()
        .bail()
        .isString()
        .bail(),
    body("surname")
        .exists({ checkNull: true })
        .bail()
        .notEmpty()
        .bail()
        .isString()
        .bail(),
    body("email")
        .exists({ checkNull: true })
        .bail()
        .notEmpty()
        .bail()
        .isEmail()
        .bail(),
    body("hash")
        .exists({ checkNull: true })
        .bail()
        .notEmpty()
        .bail()
        .isString()
        .bail(),
    body("Type")
        .exists({ checkNull: true })
        .bail()
        .notEmpty()
        .bail()
        .isString()
        .bail()
        .custom((value) => {
            return !(
                value !== "Client" &&
                value !== "Farmer" &&
                value !== "Employee" &&
                value !== "Manager"
            );
        })
        .bail(),
    body("address")
        .exists({ checkNull: true })
        .bail()
        .notEmpty()
        .bail()
        .isString()
        .bail(),
    body("phone")
        .exists({ checkNull: true })
        .bail()
        .notEmpty()
        .bail()
        .isString()
        .bail(),
    body("country")
        .exists({ checkNull: true })
        .bail()
        .notEmpty()
        .bail()
        .isString()
        .bail(),
    body("city")
        .exists({ checkNull: true })
        .bail()
        .notEmpty()
        .bail()
        .isString()
        .bail(),
    body("zip_code")
        .exists({ checkNull: true })
        .bail()
        .notEmpty()
        .bail()
        .isInt()
        .bail(),
    async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty())
            res.status(400).json({
                info: "The server cannot process the request",
                error: result.array()[0].msg,
                valueReceived: result.array()[0].value,
            });
        else {
            await dao
                .insertUser(req.body)
                .then((user) => res.json(user))
                .catch((err) => res.status(503).json(dbErrorObj));
        }
    }
);

app.post(
    "/api/new-product",
    body("name")
        .exists({ checkNull: true })
        .bail()
        .notEmpty()
        .bail()
        .isString()
        .bail(),
    body("description")
        .exists({ checkNull: true })
        .bail()
        .notEmpty()
        .bail()
        .isString()
        .bail(),
    body("category")
        .exists({ checkNull: true })
        .bail()
        .notEmpty()
        .bail()
        .isString()
        .bail(),
    body("ref_farmer")
        .exists({ checkNull: true })
        .bail()
        .notEmpty()
        .bail()
        .isInt()
        .bail(),
    body("price")
        .exists({ checkNull: true })
        .bail()
        .notEmpty()
        .bail()
        .isNumeric({ min: 0.0 })
        .bail(),
    body("availability")
        .exists({ checkNull: true })
        .bail()
        .notEmpty()
        .bail()
        .isInt()
        .bail(),
    body("unit_of_measure")
        .exists({ checkNull: true })
        .bail()
        .notEmpty()
        .bail()
        .isString()
        .bail(),
    body("image_path")
        .exists({ checkNull: true })
        .bail()
        .notEmpty()
        .bail()
        .isString()
        .bail(),
    body("start_date")
        .exists({ checkNull: true })
        .bail()
        .notEmpty()
        .bail()
        .isString()
        .bail(),
    body("end_date")
        .exists({ checkNull: true })
        .bail()
        .notEmpty()
        .bail()
        .isString()
        .bail(),
    async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty())
            res.status(400).json({
                info: "The server cannot process the request",
                error: result.array(),
                valueReceived: result.array(),
            });
        else {
            await dao
                .insertProduct(req.body)
                .then((product) => res.json(product))
                .catch((err) => res.status(503).json(dbErrorObj));
        }
    }
);

app.post(
    "/api/update-product",
    body("product_id")
        .exists({ checkNull: true })
        .bail()
        .notEmpty()
        .bail()
        .isInt()
        .bail(),
    body("name")
        .exists({ checkNull: true })
        .bail()
        .notEmpty()
        .bail()
        .isString()
        .bail(),
    body("description")
        .exists({ checkNull: true })
        .bail()
        .notEmpty()
        .bail()
        .isString()
        .bail(),
    body("category")
        .exists({ checkNull: true })
        .bail()
        .notEmpty()
        .bail()
        .isString()
        .bail(),
    body("ref_farmer")
        .exists({ checkNull: true })
        .bail()
        .notEmpty()
        .bail()
        .isInt()
        .bail(),
    body("price")
        .exists({ checkNull: true })
        .bail()
        .notEmpty()
        .bail()
        .isNumeric({ min: 0.0 })
        .bail(),
    body("availability")
        .exists({ checkNull: true })
        .bail()
        .notEmpty()
        .bail()
        .isInt()
        .bail(),
    body("unit_of_measure")
        .exists({ checkNull: true })
        .bail()
        .notEmpty()
        .bail()
        .isString()
        .bail(),
    body("image_path")
        .exists({ checkNull: true })
        .bail()
        .notEmpty()
        .bail()
        .isString()
        .bail(),
    body("start_date")
        .exists({ checkNull: true })
        .bail()
        .notEmpty()
        .bail()
        .isString()
        .bail(),
    body("end_date")
        .exists({ checkNull: true })
        .bail()
        .notEmpty()
        .bail()
        .isString()
        .bail(),
    async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty())
            res.status(400).json({
                info: "The server cannot process the request",
                error: result.array(),
                valueReceived: result.array(),
            });
        else {
            await dao
                .updateProduct(req.body)
                .then((product) => res.json(product))
                .catch((err) => res.status(503).json(dbErrorObj));
        }
    }
);

app.listen(port, () =>
  console.log(`Server app listening at http://localhost:${port}`)
);

module.exports = app;