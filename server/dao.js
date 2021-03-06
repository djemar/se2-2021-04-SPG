"use strict";

import { User } from "./user.js";
import bcrypt from "bcrypt";
import moment from "moment";
import sqlite3 from "sqlite3";

const db = new sqlite3.Database("SPG.sqlite", (err) => {
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
    start_date: e.start_date,
    end_date: e.end_date,
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

function mappingOrdersWallets(rows) {
  return rows.map((e) => ({
    order_id: e.order_id,
    user_id: e.user_id,
    date_order: e.date_order,
    wallet_balance: e.wallet_balance,
    total: e.total,
  }));
}

function mappingUsers(rows) {
  return rows.map((e) => ({
    user_id: e.user_id,
    name: e.name,
    surname: e.surname,
    company_name: e.company_name,
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

const getProducts = () => {
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

const getProductsByCategory = (category) => {
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

const getProductsByDate = (date) => {
  return new Promise((resolve, reject) => {
    if (typeof date !== "string")
      reject("Strings are expected for all date parameters");

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

const getProductsFromDate = (date) => {
  return new Promise((resolve, reject) => {
    if (typeof date !== "string")
      reject("Strings are expected for all date parameters");

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

const getProductsToDate = (date) => {
  return new Promise((resolve, reject) => {
    if (typeof date !== "string")
      reject("Strings are expected for all date parameters");

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

const getProductsBetweenDates = (startDate, endDate) => {
  return new Promise((resolve, reject) => {
    if (typeof startDate !== "string" || typeof endDate !== "string")
      reject("Strings are expected for all date parameters");

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

const getAllProductsByCategoryAndDates = (category, startDate, endDate) => {
  return new Promise((resolve, reject) => {
    if (
      typeof category !== "string" ||
      typeof startDate !== "string" ||
      typeof endDate !== "string"
    )
      reject("Strings are expected for all date parameters");

    console.log(startDate);
    console.log(endDate);
    console.log(category);
    const sql =
      "SELECT * FROM product WHERE start_date >= ? AND end_date <= ? AND category = ?";

    console.log(sql);

    db.all(sql, [startDate, endDate, category], (err, rows) => {
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
const insertUser = function (user) {
  return new Promise((resolve, reject) => {
    const balance = user.Type === "Client" ? 0.0 : null;
    const sql =
      "INSERT INTO USER(name,surname,company_name,email,password,Type,wallet_balance,address,phone,country,city,zip_code)" +
      " VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
    //ID is not needed. It's added by the insert operation
    db.run(
      sql,
      [
        user.name,
        user.surname,
        user.company,
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
            company_name: user.company,
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
  });
};

const insertProduct = function (product) {
  return new Promise((resolve, reject) => {
    if (
      typeof product.name !== "string" ||
      typeof product.description !== "string" ||
      typeof product.category !== "string" ||
      typeof product.ref_farmer !== "number" ||
      typeof product.price !== "number" ||
      typeof product.availability !== "number" ||
      typeof product.unit_of_measure !== "string" ||
      typeof product.image_path !== "string" ||
      typeof product.start_date !== "string" ||
      typeof product.end_date !== "string"
    )
      reject("Parameter constraints must be respected");
    else {
      console.log(product);
      const sql =
        "INSERT INTO PRODUCT(name, description,category, ref_farmer, price, availability, unit_of_measure, image_path, start_date, end_date)" +
        " VALUES (?,?,?,?,?,?,?,?,?,?)";
      //ID is not needed. It's added by the insert operation
      db.run(
        sql,
        [
          product.name,
          product.description,
          product.category,
          product.ref_farmer,
          product.price,
          product.availability,
          product.unit_of_measure,
          product.image_path,
          product.start_date,
          product.end_date,
        ],
        function (err) {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            let productID = this.lastID;
            console.log("Product " + productID + " added successfully");
            const p = {
              product_id: productID,
              name: product.name,
              description: product.description,
              category: product.category,
              ref_farmer: product.ref_farmer,
              price: product.price,
              availability: product.availability,
              unit_of_measure: product.unit_of_measure,
              image_path: product.image_path,
              start_date: product.start_date,
              end_date: product.end_date,
            };
            resolve(p); // returning the product object
          }
        }
      );
    }
  });
};

const updateProduct = function (product) {
  return new Promise((resolve, reject) => {
    if (
      typeof product.product_id !== "number" ||
      typeof product.name !== "string" ||
      typeof product.description !== "string" ||
      typeof product.category !== "string" ||
      typeof product.ref_farmer !== "number" ||
      typeof product.price !== "number" ||
      typeof product.availability !== "number" ||
      typeof product.unit_of_measure !== "string" ||
      typeof product.image_path !== "string" ||
      typeof product.start_date !== "string" ||
      typeof product.end_date !== "string"
    )
      reject("Parameter constraints must be respected");
    else {
      const sql =
        "UPDATE PRODUCT set name=?,description=?,category=?, " +
        "ref_farmer=?, price=?, availability=?, unit_of_measure=?, " +
        "image_path=?, start_date=?, end_date=? " +
        "WHERE product_id = ?";
      //ID is now needed to edit the specific product
      db.run(
        sql,
        [
          product.name,
          product.description,
          product.category,
          product.ref_farmer,
          product.price,
          product.availability,
          product.unit_of_measure,
          product.image_path,
          product.start_date,
          product.end_date,
          product.product_id,
        ],
        function (err, rows) {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            console.log(
              "Product " + product.product_id + " modified successfully"
            );
            const p = {
              product_id: product.product_id,
              name: product.name,
              description: product.description,
              category: product.category,
              ref_farmer: product.ref_farmer,
              price: product.price,
              availability: product.availability,
              unit_of_measure: product.unit_of_measure,
              image_path: product.image_path,
              start_date: product.start_date,
              end_date: product.end_date,
            };
            resolve(p); // returning the product object
          }
        }
      );
    }
  });
};

const removeProduct = function (productID) {
  return new Promise((resolve, reject) => {
    if (typeof productID !== "number") reject("An integer is expected");
    else {
      const sql = "DELETE FROM PRODUCT WHERE product_id = ?";
      db.run(sql, [productID], function (err) {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          console.log("Product " + productID + " removed successfully");
          resolve(productID);
        }
      });
    }
  });
};

// Remove a client:
const removeUser = function (userID) {
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
const getAllUsers = function () {
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

const insertOrder = async function (order, id_array, quantity_array) {
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
      "INSERT INTO ORDERS (order_id, ref_product, ref_user, date_order, quantity, status,total) VALUES (?, ?, ?,?,?,?,?)";
    db.run(
      sql,
      [
        order.order_id,
        id,
        order.ref_user,
        order.date_order,
        quantity,
        "pending",
        order.total,
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

const deleteOrder = function (id) {
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

const getAllOrders = function () {
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

const getAllOrdersUnretrieved = function () {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * from ORDERS WHERE status = 'unretrieved'";
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

const getOrdersAndWallets = function () {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT O.order_id, " +
      "U.wallet_balance, U.user_id, O.total, O.date_order " +
      "FROM ORDERS AS O, USER AS U " +
      "WHERE O.ref_user = U.user_id AND O.status=? " +
      "GROUP BY O.order_id, U.user_id " +
      "ORDER BY U.user_id, O.date_order DESC ";
    db.all(sql, ["pending"], (err, rows) => {
      if (err) reject(err);
      else if (rows === undefined || rows.length === 0) {
        reject(null);
      } else {
        const orders = mappingOrdersWallets(rows);
        resolve(orders);
      }
    });
  });
};

const getAllOrdersAndWallets = function () {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT O.order_id, " +
      "U.wallet_balance, U.user_id, O.total, O.date_order " +
      "FROM ORDERS AS O, USER AS U " +
      "WHERE O.ref_user = U.user_id AND O.status==? " +
      "GROUP BY O.order_id, U.user_id " +
      "ORDER BY U.user_id, O.date_order DESC ";
    db.all(sql, ["pending_cancellation"], (err, rows) => {
      if (err) reject(err);
      else if (rows === undefined || rows.length === 0) {
        reject(null);
      } else {
        const orders = mappingOrdersWallets(rows);
        resolve(orders);
      }
    });
  });
};

const getOrdersByClientId = function (clientID) {
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

const setDeliveredOrder = function (orderID) {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE ORDERS set status = ? where ORDERS.order_id = ?";
    db.all(sql, ["delivered", orderID], (err, res) => {
      if (err) reject(err);
      else resolve(true);
    });
  });
};

const setApprovedOrder = function (orderID) {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE ORDERS set status = ? where ORDERS.order_id = ?";
    db.all(sql, ["approved", orderID], (err, res) => {
      if (err) reject(err);
      else resolve(true);
    });
  });
};

const updateClientWallet = function (clientID, recharge) {
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
const getUser = (email, password) => {
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

const getUserById = (id) => {
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

/*
const deleteAllPendingCancellation = function (id) {
  return new Promise((resolve, reject) => {
    const sql = "DELETE from ORDERS where status = ?";
    db.run(sql, ["pending_cancellation"], (err) => {
      if (err) {
        reject(err);
        console.log("Errore");
      } else resolve(null);
    });
  });
};
*/

const setPendingCancellationOrder = function (orderID) {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE ORDERS set status = ? where ORDERS.order_id = ?";
    db.all(sql, ["pending_cancellation", orderID], (err, res) => {
      if (err) reject(err);
      else resolve(true);
    });
  });
};

const setUnretrievedOrder = function (orderID) {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE ORDERS set status = ? where ORDERS.order_id = ?";
    db.all(sql, ["unretrieved", orderID], (err, res) => {
      if (err) reject(err);
      else resolve(true);
    });
  });
};

const deletePendingCancellationOrder = function (orderID) {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM ORDERS WHERE status = ? AND order_id = ?";
    db.all(sql, ["pending_cancellation", orderID], (err, res) => {
      if (err) reject(err);
      else resolve(true);
    });
  });
};

//new insertOrder for order with schedule infos
const insertOrderAndSchedule = async function (
  order,
  id_array,
  quantity_array
) {
  //Need to iterate over different products in list
  var i = 0;
  const promiseList = [];
  const tmp = await retrieveNextId();
  //console.log("Ecco l'id ritornato dalla query", tmp)
  order.order_id = tmp;
  for (const id of id_array) {
    promiseList.push(
      createInsertOrderAndSchedulePromise(order, id, quantity_array[i++])
    );
  }
  return Promise.all(promiseList)
    .then()
    .catch((err) => console.log(err));
};

function createInsertOrderAndSchedulePromise(order, id, quantity) {
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO ORDERS (order_id, ref_product, ref_user, date_order, quantity, status,total,address,country,city,zip_code,schedule_date,schedule_time) VALUES (?, ?, ?,?,?,?,?,?,?,?,?,?,?)";
    db.run(
      sql,
      [
        order.order_id,
        id,
        order.ref_user,
        order.date_order,
        quantity,
        "pending",
        order.total,
        order.address,
        order.country,
        order.city,
        order.zip_code,
        order.schedule_date,
        order.schedule_time,
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

export const dao = {
  getUser,
  getUserById,
  removeUser,
  getAllUsers,
  getAllOrders,
  getAllOrdersUnretrieved,
  getAllOrdersAndWallets,
  getOrdersAndWallets,
  getOrdersByClientId,
  getProducts,
  getProductsByCategory,
  getProductsBetweenDates,
  getProductsByDate,
  getProductsFromDate,
  getProductsToDate,
  getAllProductsByCategoryAndDates,
  insertUser,
  insertOrder,
  deleteOrder,
  insertProduct,
  updateProduct,
  removeProduct,
  insertOrderAndSchedule,
  setDeliveredOrder,
  updateClientWallet,
  setPendingCancellationOrder,
  deletePendingCancellationOrder,
  setUnretrievedOrder,
  setApprovedOrder,
};
