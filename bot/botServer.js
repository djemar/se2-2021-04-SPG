import { secret_token } from "./secretToken.js";

///const TelegramBot = require('node-telegram-bot-api');
import TelegramBot from "node-telegram-bot-api";

import { core, mapProductToMsg, mapProductToMsg_2 } from "./botCore.js";

//import { ParseMode } from "node-telegram-bot-api";

// The value below is the Telegram token received from @BotFather
const token = secret_token;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

// SESSION FLAG

let SESSION_STARTED = false;

// MESSAGES

const welcome_msg =
  "Here is the <b>SPG04 Bot 🤖</> at your service!\n<i>What can i do for you?</i>";

const menu_msg =
  "Select an option from the following or find out our /slash_commands";

// SLASH COMMANDS

const subscribe_cmd =
  " - <b>/subscribe</b>: Subscribe weekly updates about new available products\n";
const unsubscribe_cmd =
  " - <b>/unsubscribe</b>: Unsubscribe from weekly updates\n";
const website_cmd = " - <b>/website</b>: Show our Website Url\n";
const about_cmd = " - <b>/about</b>: Find out something about us\n";
const menu_cmd = " - <b>/menu</b>: Find out our bot menu\n";
const help_cmd = " - <b>/help</b>: Need help to use our Bot?\n";

const slash_commands =
  subscribe_cmd +
  unsubscribe_cmd +
  website_cmd +
  about_cmd +
  menu_cmd +
  help_cmd;

// KEYBOARD

const subscribe_text = "Subscribe";
const unsubscribe_text = "Unsubscribe";
const website_text = "Website";
const about_text = "About";
const help_text = "Help";
const menu_text = "Menu";
const stop_text = "Stop";

const subscription_commands = [
  {
    text: subscribe_text,
    callback_data: "subscribe",
  },
  {
    text: unsubscribe_text,
    callback_data: "subscribe",
  },
];

const misc_commands = [
  {
    text: website_text,
    callback_data: "website",
  },
  {
    text: about_text,
    callback_data: "about",
  },
  {
    text: help_text,
    callback_data: "help",
  },
];

const utils_commands = [
  {
    text: menu_text,
    callback_data: "menu",
  },
];

const tests_commands = [
  // TEST COMMANDS
  {
    text: "Test 1",
    callback_data: "test_1",
  },
  {
    text: "Test 2",
    callback_data: "test_2",
  },
];

const menu_keyboard = [
  subscription_commands,
  misc_commands,
  tests_commands,
];

const keyboard = [
  [subscribe_text, unsubscribe_text],
  [website_text, about_text, help_text],
  [menu_text],
];

const start_opts = {
  parse_mode: "HTML",
  reply_markup: JSON.stringify({
    keyboard: keyboard,
  }),
};
const menu_opts = {
  parse_mode: "HTML",
  reply_markup: JSON.stringify({
    inline_keyboard: menu_keyboard,
  }),
};

// MENU

bot.onText(/\/start/, (msg) => {
  const id = msg.chat.id;
  if (
    core.addUser(
      id,
      msg.chat.first_name,
      msg.chat.last_name,
      msg.chat.username
    ) &&
    !SESSION_STARTED
  ) {
    SESSION_STARTED = true;
  }
  bot
    .sendMessage(
      id,
      "<b>Welcome " + msg.from.first_name + "!</b>\n\n" + welcome_msg,
      start_opts
    )
    .then(
      bot.sendMessage(msg.chat.id, "<b>MENU</b>\n\n" + menu_msg, menu_opts)
    );
});
bot.onText(/\/menu/, (msg) => {
  bot.sendMessage(msg.chat.id, "<b>MENU</b>\n\n" + menu_msg, menu_opts);
});
bot.onText(/\/slash_commands/, (msg) => {
  bot.sendMessage(msg.chat.id, "<b>SLASH COMMANDS</b>\n\n" + slash_commands, {
    parse_mode: "HTML",
  });
});

// KNOWN WORDS COMMANDS

bot.on("message", (msg) => {
  const text = msg.text.toString().toLowerCase();
  const id = msg.chat.id;
  switch (text) {
    case subscribe_text.toLowerCase():
      if (!SESSION_STARTED) {
        if (
          core.addUser(
            id,
            msg.chat.first_name,
            msg.chat.last_name,
            msg.chat.username
          )
        )
          SESSION_STARTED = true;
      }
      if (core.subscribe(id)) {
        bot.sendMessage(
          id,
          "Awesome! We will let you know when products are available every week!"
        );
      } else {
        bot.sendMessage(id, "You're already subscribed!");
      }
      break;
    case unsubscribe_text.toLowerCase():
      if (!SESSION_STARTED) {
        if (
          core.addUser(
            id,
            msg.chat.first_name,
            msg.chat.last_name,
            msg.chat.username
          )
        )
          SESSION_STARTED = true;
      }
      if (core.unsubscribe(id)) {
        bot.sendMessage(
          id,
          "From now you will not receive any notification!\nFeel free to subscribe again when you want"
        );
      } else {
        bot.sendMessage(id, "Seems you're already unsubscribed!");
      }
      break;
    case website_text.toLowerCase():
      bot.sendMessage(id, "Here it is!\n" + "https://spg04.herokuapp.com/");
      break;
    case about_text.toLowerCase():
      bot.sendMessage(id, "I don't know who i am :(");
      break;
    case help_text.toLowerCase():
      bot.sendMessage(id, "Pray :)");
      break;
    case menu_text.toLowerCase():
      bot.sendMessage(id, "<b>MENU</b>\n\n" + menu_msg, menu_opts);
      break;
    case stop_text.toLowerCase():
      //bot.stopPolling();
      break;
    default:
      break;
  }
});

// SLASH COMMANDS

bot.onText(/\/subscribe/, (msg) => {
  const id = msg.chat.id;
  if (!SESSION_STARTED) {
    if (
      core.addUser(
        id,
        msg.chat.first_name,
        msg.chat.last_name,
        msg.chat.username
      )
    )
      SESSION_STARTED = true;
  }
  if (core.subscribe(id)) {
    bot.sendMessage(
      id,
      "Awesome! We will let you know when products are available every week!"
    );
  } else {
    bot.sendMessage(id, "You're already subscribed!");
  }
});
bot.onText(/\/unsubscribe/, (msg) => {
  const id = msg.chat.id;
  if (!SESSION_STARTED) {
    if (
      core.addUser(
        id,
        msg.chat.first_name,
        msg.chat.last_name,
        msg.chat.username
      )
    )
      SESSION_STARTED = true;
  }
  if (core.unsubscribe(id)) {
    bot.sendMessage(
      id,
      "From now you will not receive any notification!\nFeel free to subscribe again when you want"
    );
  } else {
    bot.sendMessage(id, "Seems you're already unsubscribed!");
  }
});

// Receiving "/about"
bot.onText(/\/about/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "I don't know who i am :(");
});

// Receiving "/help"
bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Pray :)");
});
// Receiving "/website"
bot.onText(/\/website/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Here it is!\n" + "https://spg04.herokuapp.com/");
});

// Handle callback queries
bot.on("callback_query", function onCallbackQuery(callbackQuery) {
  const action = callbackQuery.data;
  const msg = callbackQuery.message;
  const id = msg.chat.id;

  switch (action) {
    case "subscribe":
      if (!SESSION_STARTED) {
        if (
          core.addUser(
            id,
            msg.chat.first_name,
            msg.chat.last_name,
            msg.chat.username
          )
        )
          SESSION_STARTED = true;
      }
      if (core.subscribe(id)) {
        bot.sendMessage(
          id,
          "Awesome! We will let you know when products are available every week!"
        );
      } else {
        bot.sendMessage(id, "You're already subscribed!");
      }
      break;
    case "unsubscribe":
      if (!SESSION_STARTED) {
        if (
          core.addUser(
            id,
            msg.chat.first_name,
            msg.chat.last_name,
            msg.chat.username
          )
        )
          SESSION_STARTED = true;
      }
      if (core.unsubscribe(id)) {
        bot.sendMessage(
          id,
          "From now you will not receive any notification!\nFeel free to subscribe again when you want"
        );
      } else {
        bot.sendMessage(id, "Seems you're already unsubscribed!");
      }
      break;
    case "website":
      bot.sendMessage(id, "Here it is!\n" + "https://spg04.herokuapp.com/");
      break;
    case "about":
      bot.sendMessage(id, "I don't know who i am :(");
      break;
    case "help":
      bot.sendMessage(id, "Pray :)");
      break;
    case "test_1":
      if (!SESSION_STARTED) {
        if (
          core.addUser(
            id,
            msg.chat.first_name,
            msg.chat.last_name,
            msg.chat.username
          )
        )
          SESSION_STARTED = true;
      }
      test1(id);
      products.forEach((p) =>
        bot.sendPhoto(
          msg.chat.id,
          "http://via.placeholder.com:80/150/09f/fff.jpg",
          mapProductToMsg_2(p)
        )
      );
      break;
    case "test_2":
      if (!SESSION_STARTED) {
        if (
          core.addUser(
            id,
            msg.chat.first_name,
            msg.chat.last_name,
            msg.chat.username
          )
        )
          SESSION_STARTED = true;
      }
      test2(id);
      const usersId = core.getSubscribedUsersId();
      const media = products.map((p) => mapProductToMsg(p));
      usersId.forEach((id) => bot.sendMediaGroup(parseInt(id), media));
      break;
    default:
      break;
  }
});

// DEBUG
bot.on("polling_error", (error) => {
  console.log(error.code); // => 'EFATAL'
});

const test1 = (id) => {
  console.log("User: " + core.getUserInfo(id) + " - Clicked on Test 1!");
};

const test2 = (id) => {
  console.log("User: " + core.getUserInfo(id) + " - Clicked on Test 2!");
};

const products = [
  {
    product_id: 1,
    name: "Prodotto 1",
    description: "text text text text text text text text text text",
    category: "Categoria 1",
    ref_farmer: "Venditore 1",
    price: "10",
    availability: 10,
    unit_of_measure: "Kg",
    image_path: "./img/uploads/apples.jpg",
  },
  {
    product_id: 2,
    name: "Prodotto 2",
    description: "text text text text text text text text text text",
    category: "Categoria 2",
    ref_farmer: "Venditore 2",
    price: "10",
    availability: 10,
    unit_of_measure: "Kg",
    image_path: "./img/uploads/apples.jpg",
  },
  {
    product_id: 3,
    name: "Prodotto 3",
    description: "text text text text text text text text text text",
    category: "Categoria 3",
    ref_farmer: "Venditore 3",
    price: "10",
    availability: 10,
    unit_of_measure: "Kg",
    image_path: "./img/uploads/apples.jpg",
  },
];
