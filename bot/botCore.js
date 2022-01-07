// CORE
import { Bot, User } from "./Bot.js";

const bot_data = new Bot();

export const core = {
  subscribe: (id) => {
    if (!bot_data.isUserSubscribed(id)) {
      bot_data.subscribeUser(id);
      return true;
    }
    return false;
  },
  unsubscribe: (id) => {
    if (bot_data.isUserSubscribed(id)) {
      bot_data.unsubscribeUser(id);
      return true;
    }
    return false;
  },
  getUserInfo: (id) => {
    return bot_data.getUserInfo(id);
  },
  getUsersId: () => {
    return bot_data.getUsersId();
  },
  getSubscribedUsersId: () => {
    return bot_data.getSubscribedUsersId();
  },
  addUser: (id, name, surname, username) => {
    if (bot_data.addUser(id, name, surname, username)) {
      return true;
    }
    return false;
  },
};

export const mapProductToMsg = (product) => {
  const type = "photo";
  const media = "http://via.placeholder.com:80/150/09f/fff.jpg";
  //"http://localhost:3000/" + String(product.image_path).substring(2);
  const caption =
    "<b>🥫 " +
    product.name.toUpperCase() +
    "</b>" +
    "\n\n" +
    "👨🏽‍🌾 FARMER: " +
    "<i>" +
    product.ref_farmer +
    "</i>" +
    "\n" +
    "💰 PRICE: " +
    "<i>" +
    product.price +
    " € / " +
    product.unit_of_measure +
    "</i>\n\n" +
    "Description: \n" +
    "<i>" +
    product.description +
    "</i>";
  const parse_mode = "HTML";
  return { type, media, caption, parse_mode };
};

export const mapProductToMsg_2 = (product) => {
  //"http://localhost:3000/" + String(product.image_path).substring(2);
  const caption =
    "<b>🥫 " +
    product.name.toUpperCase() +
    "</b>" +
    "\n\n" +
    "👨🏽‍🌾 FARMER: " +
    "<i>" +
    product.ref_farmer +
    "</i>" +
    "\n" +
    "💰 PRICE: " +
    "<i>" +
    product.price +
    " € / " +
    product.unit_of_measure +
    "</i>\n\n" +
    "Description: \n" +
    "<i>" +
    product.description +
    "</i>";
  return {
    caption: caption,
    parse_mode: "HTML",
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [
          {
            text: "👨🏽‍🌾 Show on Website 🌾",
            url: "https://spg04.herokuapp.com/",
            //callback_data: "show",
          },
        ],
      ],
    }),
  };
};
