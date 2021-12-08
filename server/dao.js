"use strict";

const User = require("./user");

const bcrypt = require("bcrypt");
const moment = require("moment");

// Data Access Object
// DAO module for accessing courses and exams

// Password are made with bcrypt
// https://www.browserling.com/tools/bcrypt
const sqlite = require("sqlite3");
const db = new sqlite.Database("SPG.sqlite", (err) => {
  if (err) throw err;
});

/// Functions: /////////////////////////////////////////////////////////////////////////////////////////////////////////

function mappingProducts(rows) {
  return rows.map((e) => ({
    product_id: e.product_id,
    name: e.name,
    description: e.description,
    category: e.category,
    ref_farmer: e.ref_farmer,
    price: e.price,
    availability: e.availability,
    unit_of_measure: e.unit_of_measure,
    image_path: e.image_path,
    start_date:  e.start_date,
    end_date: e.end_date
  }));
}

function mappingOrders(rows) {
  return rows.map((e) => ({
    order_id: e.order_id,
    ref_product: e.ref_product,
    ref_user: e.ref_user,
    date_order: e.date_order,
    quantity: e.quantity,
    status: e.status,
  }));
}

function mappingUsers(rows) {
  return rows.map((e) => ({
    user_id: e.user_id,
    name: e.name,
    surname: e.surname,
    email: e.email,
    hash: e.password,
    Type: e.Type,
    wallet_balance: e.wallet_balance,
    address: e.address,
    phone: e.phone,
    country: e.country,
    city: e.city,
    zip_code: e.zip_code,
  }));
}

/// Queries: ///////////////////////////////////////////////////////////////////////////////////////////////////////////

/************** Products **************/

exports.getProducts = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM product";

    db.all(sql, [], (err, rows) => {
      if (err) reject(err);
      else if (rows === undefined || rows.length === 0) {
        reject(null);
        console.log("0 ROWS!");
      } else {
        const products = mappingProducts(rows);
        resolve(products);
      }
    });
  });
};

exports.getProductsByCategory = (category) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM product WHERE category = ?";

    db.all(sql, [category], (err, rows) => {
      if (err) reject(err);
      else if (rows === undefined || rows.length === 0) {
        reject(err);
        console.log("0 ROWS!");
      } else {
        const products = mappingProducts(rows);
        resolve(products);
      }
    });
  });
};

exports.getProductsByDate = (date) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM product WHERE start_date <= ? AND end_date >= ?";

    db.all(sql, [date, date], (err, rows) => {
      if (err) reject(err);
      else if (rows === undefined || rows.length === 0) {
        reject(err);
        console.log("0 ROWS!");
      } else {
        const products = mappingProducts(rows);
        resolve(products);
      }
    });
  });
};

exports.getProductsFromDate = (date) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM product WHERE start_date >= ?";

    db.all(sql, [date], (err, rows) => {
      if (err) reject(err);
      else if (rows === undefined || rows.length === 0) {
        reject(err);
        console.log("0 ROWS!");
      } else {
        const products = mappingProducts(rows);
        resolve(products);
      }
    });
  });
};

exports.getProductsToDate = (date) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM product WHERE end_date <= ?";

    db.all(sql, [date], (err, rows) => {
      if (err) reject(err);
      else if (rows === undefined || rows.length === 0) {
        reject(err);
        console.log("0 ROWS!");
      } else {
        const products = mappingProducts(rows);
        resolve(products);
      }
    });
  });
};

exports.getProductsBetweenDates = (startDate, endDate) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM product WHERE start_date >= ? AND end_date <= ?";

    db.all(sql, [startDate, endDate], (err, rows) => {
      if (err) reject(err);
      else if (rows === undefined || rows.length === 0) {
        reject(err);
        console.log("0 ROWS!");
      } else {
        const products = mappingProducts(rows);
        resolve(products);
      }
    });
  });
};

/************** Users **************/

// Insert a new client:
exports.insertUser = function (user) {
  return new Promise((resolve, reject) => {
    if (
      typeof user.name !== "string" ||
      typeof user.surname !== "string" ||
      typeof user.email !== "string" ||
      typeof user.hash !== "string" ||
      typeof user.Type !== "string" ||
      typeof user.address !== "string" ||
      typeof user.phone !== "string" || // Also phone number must be a string
      typeof user.country !== "string" ||
      typeof user.city !== "string" ||
      typeof user.zip_code !== "number"
    )
      reject(
        "Strings are expected for all parameters, except for zip_code which must be an Integer"
      );
    else {
      const balance = user.Type === "Client" ? 0.0 : null;
      const sql =
        "INSERT INTO USER(name,surname,email,password,Type,wallet_balance,address,phone,country,city,zip_code)" +
        " VALUES (?,?,?,?,?,?,?,?,?,?,?)";
      //ID is not needed. It's added by the insert operation
      db.run(
        sql,
        [
          user.name,
          user.surname,
          user.email,
          user.hash, // password assumed to be already hashed by frontend
          user.Type,
          balance,
          user.address,
          user.phone,
          user.country,
          user.city,
          user.zip_code,
        ],
        function (err) {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            let userID = this.lastID;
            console.log("User " + userID + " added successfully");
            const u = {
              user_id: userID,
              name: user.name,
              surname: user.surname,
              email: user.email,
              hash: user.hash,
              Type: user.Type,
              wallet_balance: balance,
              address: user.address,
              phone: user.phone,
              country: user.country,
              city: user.city,
              zip_code: user.zip_code,
            };
            resolve(u); // returning the user object
          }
        }
      );
    }
  });
};

// Remove a client:
exports.removeUser = function (userID) {
  return new Promise((resolve, reject) => {
    if (typeof userID !== "number") reject("An integer is expected");
    else {
      const sql = "DELETE FROM USER WHERE user_id = ?";
      db.run(sql, [userID], function (err) {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          console.log("User " + userID + " removed successfully");
          resolve(userID);
        }
      });
    }
  });
};

// Get all the users:
exports.getAllUsers = function () {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * from USER";
    db.all(sql, [], (err, us) => {
      if (err) reject(err);
      else if (us === undefined || us.length === 0) {
        reject(null);
      } else {
        const users = mappingUsers(us);
        resolve(users);
      }
    });
  });
};

/************** Orders **************/

async function retrieveNextId() {
  return new Promise((resolve, reject) => {
    const sql = "SELECT max(order_id) as order_index from ORDERS ";
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
        console.log("Errore in retrieveNextId");
      } else {
        const index = rows.map((e) => {
          return e.order_index;
        });
        if (rows[0].order_index == null) {
          console.log("Non ci sono righe presenti");
          resolve(1);
        } else {
          resolve(parseInt(index[0] + 1));
        }
      }
    });
  });
}

exports.insertOrder = async function (order, id_array, quantity_array) {
  //Need to iterate over different products in list
  var i = 0;
  const promiseList = [];
  const tmp = await retrieveNextId();
  //console.log("Ecco l'id ritornato dalla query", tmp)
  order.order_id = tmp;
  for (const id of id_array) {
    promiseList.push(createInsertOrderPromise(order, id, quantity_array[i++]));
  }
  return Promise.all(promiseList)
    .then()
    .catch((err) => console.log(err));
};

function createInsertOrderPromise(order, id, quantity) {
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO ORDERS (order_id, ref_product, ref_user, date_order, quantity, status) VALUES (?, ?, ?,?,?,?)";
    db.run(
      sql,
      [
        order.order_id,
        id,
        order.ref_user,
        order.date_order,
        quantity,
        "pending",
      ],
      function (err) {
        if (err) {
          resolve(false);
        } else {
          resolve(true);
        }
      }
    );
  });
}

exports.deleteTestOrder = function (id) {
  return new Promise((resolve, reject) => {
    const sql = "DELETE from ORDERS where order_id = ?";
    db.run(sql, [id], (err) => {
      if (err) {
        reject(err);
        console.log("Errore");
      } else resolve(null);
    });
  });
};

exports.getAllOrders = function () {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * from ORDERS";
    db.all(sql, [], (err, rows) => {
      if (err) reject(err);
      else if (rows === undefined || rows.length === 0) {
        reject(null);
      } else {
        const orders = mappingOrders(rows);
        resolve(orders);
      }
    });
  });
};

exports.getOrdersByClientId = function (clientID) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * from ORDERS where ref_user = ?";
    db.all(sql, [clientID], (err, ord) => {
      if (err) reject(err);
      else if (ord === undefined || ord.length === 0) {
        reject(null);
      } else {
        const orders = mappingOrders(ord);
        resolve(orders);
      }
    });
  });
};

exports.setDeliveredOrder = function (orderID) {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE ORDERS set status = ? where ORDERS.order_id = ?";
    db.all(sql, ["delivered", orderID], (err, res) => {
      if (err) reject(err);
      else resolve(true);
    });
  });
};

exports.updateClientWallet = function (clientID, recharge) {
  return new Promise((resolve, reject) => {
    if (recharge < 0.0) {
      reject("Negative amount");
      return;
    }
    const sql =
      "UPDATE USER set wallet_balance =wallet_balance+? where user_id = ?";
    db.all(sql, [recharge, clientID], (err, res) => {
      if (err) reject(err);
      else {
        resolve(true);
      }
    });
  });
};

// LOGIN
exports.getUser = (email, password) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM user WHERE email = ?";
    db.get(sql, [email], (err, row) => {
      if (err) reject(err);
      if (row === undefined) {
        reject(err);
      } else {
        const user = {
          id: row.user_id,
          username: row.email,
          name: row.name,
          surname: row.surname,
          userType: row.Type,
          wallet_balance: row.wallet_balance,
        };
        // check the hashes with an async call
        bcrypt.compare(password, row.password).then((result, err) => {
          if (err) {
            reject(err);
          }

          if (result) {
            resolve(user);
          } else {
            reject(err);
          }
        });
      }
    });
  });
};

exports.getUserById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM user WHERE user_id = ?";
    db.get(sql, [id], (err, row) => {
      if (err) reject(err);
      else if (row === undefined) resolve({ error: "User not found." });
      else {
        // by default, the local strategy looks for "username"
        const user = {
          id: row.user_id,
          username: row.email,
          name: row.name,
          surname: row.surname,
          userType: row.Type,
          wallet_balance: row.wallet_balance,
        };
        resolve(user);
      }
    });
  });
};
