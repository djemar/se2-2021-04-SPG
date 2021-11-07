"use strict";

const User = require("./user");

const bcrypt = require("bcrypt");
const moment = require("moment");

// Data Access Object
// DAO module for accessing courses and exams

// Password are made with bcrypt
// officer email: s286329@studenti.polito.it
// current officer has password: teamSE04
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
  }));
}

/// Queries: ///////////////////////////////////////////////////////////////////////////////////////////////////////////

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

// Insert a new client:
exports.insertClient = function (client) {
  return new Promise((resolve, reject) => {

    if((typeof(client.name) !== 'string') ||
        (typeof(client.surname) !== 'string') ||
        (typeof(client.email) !== 'string') ||
        (typeof(client.hash) !== 'string'))
          reject("Strings are expected");
    else {

      const sql =
          "INSERT INTO USER(name,surname,email,password,Type) VALUES (?,?,?,?,?)";
      //ID is not needed. It's added by the insert operation
      db.run(
          sql,
          [
            client.name,
            client.surname,
            client.email,
            client.hash, // password assumed to be already hashed by frontend
            "Client"
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

    if(typeof(clientID) !== 'number')
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
