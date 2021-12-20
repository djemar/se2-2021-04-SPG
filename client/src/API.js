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

async function login(credentials) {
  let jsonCred = JSON.stringify(credentials);
  let response = await fetch(BASEURL + '/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: jsonCred,
  });
  if (response.ok) {
    const user = await response.json();
    return user;
  } else {
    try {
      const errDetail = await response.json();
      throw errDetail.message;
    } catch (err) {
      throw err;
    }
  }
}

async function logout() {
  await fetch('/api/login/current', { method: 'DELETE' });
}

async function checkSession() {
  const response = await fetch(BASEURL + '/login/current');
  const userInfo = await response.json();
  if (response.ok) {
    return userInfo;
  } else {
    throw userInfo; // an object with the error coming from the server
  }
}

/************** Products **************/

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
  let categoryWithSpaces;
  if (categoryProduct !== undefined && categoryProduct !== '')
    categoryWithSpaces = categoryProduct.replaceAll('-', ' ');

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

async function insertProduct(
  name,
  description,
  category,
  ref_farmer,
  price,
  availability,
  unit_of_measure,
  image_path,
  start_date,
  end_date
) {
  let url = BASEURL + '/new-product';
  let product = {
    name: name,
    description: description,
    category: category,
    ref_farmer: ref_farmer,
    price: parseFloat(price),
    availability: availability,
    unit_of_measure: unit_of_measure,
    image_path: image_path,
    start_date: start_date,
    end_date: end_date,
  };

  try {
    await axios.post(url, product);
    return true;
  } catch (error) {
    console.log(error);
  }
}

async function getProductsByDate(date) {
  let url = BASEURL + `/products-by-date`;
  try {
    const res = await axios.post(url, {
      date: date,
    });
    return await res.data;
  } catch (error) {
    console.log(error);
  }
}

async function getProductsFromDate(date) {
  let url = BASEURL + `/products-from-date`;
  try {
    const res = await axios.post(url, {
      date: date,
    });
    return await res.data;
  } catch (error) {
    console.log(error);
  }
}

async function editProduct(
  product_id,
  name,
  description,
  category,
  ref_farmer,
  price,
  availability,
  unit_of_measure,
  image_path,
  start_date,
  end_date
) {
  let url = BASEURL + '/update-product';
  let product = {
    product_id: product_id,
    name: name,
    description: description,
    category: category,
    ref_farmer: ref_farmer,
    price: price,
    availability: availability,
    unit_of_measure: unit_of_measure,
    image_path: image_path,
    start_date: start_date,
    end_date: end_date,
  };

  try {
    await axios.post(url, product);
    return true;
  } catch (error) {
    console.log(error);
  }
}

async function getAllProductsByCategoryAndDates(
  categoryProduct,
  startDate,
  endDate
) {
  let url = BASEURL + '/products-between-dates-category';
  let categoryWithSpaces;
  if (categoryProduct !== undefined && categoryProduct !== '')
    categoryWithSpaces = categoryProduct.replaceAll('-', ' ');

  try {
    const res = await axios.post(url, {
      category: categoryProduct, //name of the category
      startDate: startDate,
      endDate: endDate,
    });
    //console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

async function getProductsToDate(date) {
  let url = BASEURL + `/products-to-date`;
  try {
    const res = await axios.post(url, {
      date: date,
    });
    return await res.data;
  } catch (error) {
    console.log(error);
  }
}

async function getProductsBetweenDates(startDate, endDate) {
  let url = BASEURL + `/products-between-dates`;
  if (endDate < startDate) {
    console.log('endDate cannot come before than startDate.');
    return { error: 'endDate cannot come before than startDate' };
  }
  try {
    const res = await axios.post(url, {
      startDate: startDate,
      endDate: endDate,
    });
    return await res.data;
  } catch (error) {
    console.log(error);
  }
}

/************** Users **************/

async function addUser(user_object) {
  let url = BASEURL + '/new-user';
  let user = {
    name: user_object.name,
    surname: user_object.surname,
    company: user_object.company,
    email: user_object.email,
    hash: user_object.hash,
    Type: user_object.Type,
    address: user_object.address,
    phone: user_object.phone,
    country: user_object.country,
    city: user_object.city,
    zip_code: user_object.zip_code,
  };

  try {
    const res = await axios.post(url, user);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

async function getAllUsers() {
  let url = BASEURL + `/users`;
  try {
    const res = await axios.get(url);
    return await res.data;
  } catch (error) {
    console.log(error);
  }
}

/*To do*/
/*
async function getAllClients() {
  let url = BASEURL + `/user`;
}
*/

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

async function addOrder(ref_user, productList, date_order, total) {
  let url = BASEURL + '/order';
  let order = { ref_user, productList, date_order, total };

  try {
    await axios.post(url, order);
    return true;
  } catch (error) {
    console.log(error);
  }
}

const mapOrders = (orders, products) => {
  const IDs = Array.from(new Set(orders?.map(o => o.order_id)));

  const mappedTmp = IDs.map(id => {
    const orderFilters = orders?.filter(({ order_id: oid }) => oid === id);

    let totalPrice = 0;
    const productsMapped = orderFilters.map(o => {
      const product = products.find(p => p.product_id === o.ref_product);
      if (!product) return false;
      totalPrice += product.price * o.quantity;
      return {
        prod: o.ref_product,
        qnt: o.quantity,
        prod_name: product.name,
        price_per_unit: product.price,
      };
    });

    return {
      order_id: id,
      ref_user: orderFilters[0].ref_user,
      date_order: orderFilters[0].date_order,
      products_and_qnt: productsMapped,
      tot_price: totalPrice,
      status: orderFilters[0].status,
    };
  });

  // Filtering testing order
  return mappedTmp.filter(o => o.order_id !== 1);
};

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

async function setDeliveredOrder(orderID) {
  let url = BASEURL + `/set-delivered-order/`;
  try {
    const res = await axios.post(url, { order_id: orderID });
    return await res.data;
  } catch (error) {
    console.log(error);
  }
}

async function updateClientWallet(clientID, recharge) {
  let url = BASEURL + `/recharge-wallet/`;
  let data = { clientID, recharge };
  console.log(data);
  try {
    const res = await axios.post(url, data);
    return await res.data;
  } catch (error) {
    console.log(error);
  }
}

async function setAllPendingCancellationOrder() {
  let url = BASEURL + `/set-all-pending-cancellation-order/`;
  try {
    const res = await axios.get(url);
    return await res.data;
  } catch (error) {
    console.log(error);
  }
}

async function deleteAllPendingOrder() {
  let url = BASEURL + `/delete-all-pending-cancellation-order/`;
  try {
    const res = await axios.get(url);
    return await res.data;
  } catch (error) {
    console.log(error);
  }
}

async function setPendingCancellationOrder(orderID) {
  let url = BASEURL + `/set-pending-cancellation-order/`;
  try {
    const res = await axios.post(url, { order_id: orderID });
    return await res.data;
  } catch (error) {
    console.log(error);
  }
}

async function deleteOrder(orderID) {
  let url = BASEURL + `/delete-order/` + orderID;
  try {
    const res = await axios.post(url, { order_id: orderID });
    return await res.data;
  } catch (error) {
    console.log(error);
  }
}

// Functions exported by this API:
const API = {
  getAllProducts,
  getAllProductsByCategory,
  getProductsByDate,
  getProductsFromDate,
  getProductsToDate,
  getProductsBetweenDates,
  getAllProductsByCategoryAndDates,
  addUser,
  getAllUsers,
  addOrder,
  getHashedPWD,
  getAllOrders,
  getClientOrders,
  setDeliveredOrder,
  updateClientWallet,
  login,
  logout,
  mapOrders,
  checkSession,
  setPendingCancellationOrder,
  setAllPendingCancellationOrder,
  deleteAllPendingOrder,
  deleteOrder,
  editProduct,
  insertProduct,
};
export default API;
