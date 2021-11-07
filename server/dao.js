"use strict";

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

//Query

exports.getProducts = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM product";

    db.all(sql, [], (err, rows) => {
      if (err) reject(err);
      else if (rows === undefined || rows.length === 0) {
        reject(null);
        console.log("0 ROWS!");
      } else {
        const products = rows.map((e) => ({
          product_id: e.product_id,
          name: e.name,
          description: e.description,
          category: e.category,
          ref_user: e.ref_user,
          price: e.price,
          availability: e.availability,
          unit_of_measure: e.unit_of_measure,
        }));

        resolve(products);
        return;
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
        const products = rows.map((e) => ({
          product_id: e.product_id,
          name: e.name,
          description: e.description,
          category: e.category,
          ref_user: e.ref_user,
          price: e.price,
          availability: e.availability,
          unit_of_measure: e.unit_of_measure,
        }));

        resolve(products);
        return;
      }
    });
  });
};
