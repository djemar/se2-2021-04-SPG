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

/************** Users **************/

async function addUser(user_object) {
  let url = BASEURL + '/new-user';
  let user = {
    name: user_object.name,
    surname: user_object.surname,
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

/************** Orders **************/

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

async function setDeliveredOrder(orderID) {
  let url = BASEURL + `/set-delivered-order/`;
  try {
    const res = await axios.post(url, orderID);
    return await res.data;
  } catch (error) {
    console.log(error);
  }
}

async function updateClientWallet(clientID, recharge) {
  let url = BASEURL + `/recharge-wallet/`;
  let data = { clientID, recharge };
  try {
    const res = await axios.post(url, data);
    return await res.data;
  } catch (error) {
    console.log(error);
  }
}

// Functions exported by this API:
const API = {
  getAllProducts,
  getAllProductsByCategory,
  addUser,
  getAllUsers,
  addOrder,
  getHashedPWD,
  getAllOrders,
  getClientOrders,
  setDeliveredOrder,
  updateClientWallet,
};
export default API;
