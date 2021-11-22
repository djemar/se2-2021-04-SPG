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
    ref_user: e.ref_user,
    price: e.price,
    availability: e.availability,
    unit_of_measure: e.unit_of_measure,
    image_path: e.image_path
  }));
}

function mappingOrders(rows) {
  return rows.map((e) => ({
    order_id: e.order_id,
    ref_product: e.ref_product,
    ref_user: e.ref_user,
    date_order: e.date_order,
    quantity: e.quantity,
    status: e.status
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
    wallet_balance: e.wallet_balance
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
        console.log(rows);
        const products = mappingProducts(rows);
        resolve(products);
      }
    });
  });
};


/************** Users **************/

// Insert a new client:
exports.insertClient = function (client) {
  return new Promise((resolve, reject) => {

    if ((typeof (client.name) !== 'string') ||
      (typeof (client.surname) !== 'string') ||
      (typeof (client.email) !== 'string') ||
      (typeof (client.hash) !== 'string'))
      reject("Strings are expected");
    else {

      const sql =
        "INSERT INTO USER(name,surname,email,password,Type,wallet_balance) VALUES (?,?,?,?,?,?)";
      //ID is not needed. It's added by the insert operation
      db.run(
        sql,
        [
          client.name,
          client.surname,
          client.email,
          client.hash, // password assumed to be already hashed by frontend
          "Client",
          0.0
        ],
        function (err) {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            let clientID = this.lastID;
            console.log("Client " + clientID + " added successfully");
            resolve(clientID); // returning the client ID
          }
        }
      );
    }
  });
};


// Remove a client:
exports.removeClient = function (clientID) {
  return new Promise((resolve, reject) => {

    if (typeof (clientID) !== 'number')
      reject("An integer is expected");
    else {
      const sql =
        "DELETE FROM USER WHERE user_id = ?";
      db.run(
        sql,
        [
          clientID
        ],
        function (err) {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            console.log("Client " + clientID + " removed successfully");
            resolve(clientID);
          }
        }
      );
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
  })
}


/************** Orders **************/

async function retrieveNextId() {
  return new Promise((resolve, reject) => {
    const sql = "SELECT max(order_id) as order_index from ORDERS ";
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
        console.log("Errore in retrieveNextId");
      }
      else {
        const index = rows.map((e) => { return e.order_index });
        if (rows[0].order_index == null) {
          console.log("Non ci sono righe presenti")
          resolve(1);
        } else {
          console.log(index);
          resolve(parseInt(index[0] + 1));
        }
      }
    })
  })
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
          console.log("Succesfully added product " + id + " in order n°" + order.order_id);
          resolve(true);
        }
      }
    );
  })
}

exports.deleteTestOrder = function (id) {
  return new Promise((resolve, reject) => {
    const sql = "DELETE from ORDERS where order_id = ?";
    db.run(sql, [id], (err) => {
      if (err) {
        reject(err);
        console.log('Errore');
      }
      else
        resolve(null);
    });
  });
}

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
  })
}

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
  })
}

exports.setDeliveredOrder = function (orderID) {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE ORDERS set status = ? where ORDERS.order_id = ?';
    db.all(sql, ["delivered", orderID], (err, res) => {
      if (err)
        reject(err);
      else
        resolve(true);
    });
  })
}

exports.updateClientWallet = function (clientID, recharge) {
  return new Promise((resolve, reject) => {
    if (recharge < 0.0) {
      reject("Negative amount");
      return;
    }
    const sql = 'UPDATE USER set wallet_balance =wallet_balance+? where user_id = ?';
    db.all(sql, [recharge, clientID], (err, res) => {
      if (err)
        reject(err);
      else {
        console.log("Added: ", recharge, " to the user: ", clientID);
        resolve(true);
      }
    });
  })

}
