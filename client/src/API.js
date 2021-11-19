import axios from 'axios';
const bcrypt = require('bcryptjs');

// UTILS

const getHashedPWD = pwd => {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(pwd, salt);
  return hash;
};

/*
	API.js contains all the API calls and the methods that communicate with the backend.
*/

const BASEURL = '/api';

async function getAllProducts() {
  let url = BASEURL + `/products`;
  try {
    const res = await axios.get(url);
    return await res.data;
  } catch (error) {
    console.log(error);
  }
}

async function getAllProductsByCategory(categoryProduct) {
  let url = BASEURL + '/products';
  console.log('CATEGORY: ', categoryProduct);
  let categoryWithSpaces;
  if (categoryProduct !== undefined && categoryProduct !== '')
    categoryWithSpaces = categoryProduct.replaceAll('-', ' ');

  console.log('catePro', categoryWithSpaces);
  try {
    const res = await axios.post(url, {
      category: categoryProduct, //name of the category
    });
    //console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

/* async function getProducts() {
  const response = await fetch(BASEURL + '/products');
  const products = await response.json();
  if (response.ok) {
    return products;
  } else {
    console.log('Errore');
    throw products;
  }
}

async function getProductsByCategory(category) {
  return new Promise((resolve, reject) => {
    let obj = new Object();
    obj.category = category;
    fetch(BASEURL + '/prducts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    })
      .then(response => {
        if (response.ok) {
          resolve(null);
        } else {
          //analyze the cause of error
          response
            .json()
            .then(obj => {
              reject(obj);
            }) //error message in the response body
            .catch(err => {
              reject({
                errors: [
                  {
                    param: 'Application',
                    masg: 'Cannot parse server response',
                  },
                ],
              });
            });
        }
      })
      .catch(err => {
        reject({ errors: [{ param: 'Server', msg: 'Cannot communicate' }] });
      });
  });
}
 */

async function addClient(name, surname, email, hash) {
  let url = BASEURL + '/new-client';
  let client = { name, surname, email, hash };

  try {
    const res = await axios.post(url, client);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

/* async function addClient(name, surname, email, hash) {
  return new Promise((resolve, reject) => {
    let client = { name, surname, email, hash };
    fetch(BASEURL + '/new-client', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(client),
    })
      .then(response => {
        if (response.ok) {
          resolve(response.json());
        } else {
          //analyze the cause of error
          response
            .json()
            .then(obj => {
              reject(obj);
            }) //error message in the response body
            .catch(err => {
              reject({
                errors: [
                  {
                    param: 'Application',
                    masg: 'Cannot parse server response',
                  },
                ],
              });
            });
        }
      })
      .catch(err => {
        reject({ errors: [{ param: 'Server', msg: 'Cannot communicate' }] });
      });
  });
} */

/* async function addOrder(ref_user, productList, date_order) {
  return new Promise((resolve, reject) => {
    let order = { ref_user, productList, date_order };
    fetch(BASEURL + '/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    })
      .then(response => {
        if (response.ok) {
          resolve(true);
        } else {
          //analyze the cause of error
          response
            .json()
            .then(obj => {
              reject(obj);
            }) //error message in the response body
            .catch(err => {
              reject({
                errors: [
                  {
                    param: 'Application',
                    masg: 'Cannot parse server response',
                  },
                ],
              });
            });
        }
      })
      .catch(err => {
        reject({ errors: [{ param: 'Server', msg: 'Cannot communicate' }] });
      });
  });
} */

async function addOrder(ref_user, productList, date_order) {
  let url = BASEURL + '/order';
  let order = { ref_user, productList, date_order };

  try {
    await axios.post(url, order);
    return true;
  } catch (error) {
    console.log(error);
  }
}

async function getAllOrders() {
  let url = BASEURL + `/orders`;
  try {
    const res = await axios.get(url);
    return await res.data;
  } catch (error) {
    console.log(error);
  }
}

async function getClientOrders(clientID) {
  let url = BASEURL + `/client-orders/` + clientID;
  try {
    const res = await axios.get(url);
    return await res.data;
  } catch (error) {
    console.log(error);
  }
}

const API = {
  getAllProducts,
  getAllProductsByCategory,
  addClient,
  addOrder,
  getHashedPWD,
  getAllOrders,
  getClientOrders,
};
export default API;
