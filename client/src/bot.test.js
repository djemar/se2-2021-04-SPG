import { env } from 'process';

import { APIbot } from '../../server/bot/botServer';

const TOKEN = env.BOT_SECRET_TOKEN;

const TelegramTester = require('telegram-test');
const TelegramBot = require('node-telegram-bot-api');
const telegramBot = new TelegramBot(TOKEN);

// Possible commands:
// /start
// /menu
// /slash_commands
// /subscribe
// /unsubscribe
// /about
// /help
// /website

describe('Telegram Test', () => {
  APIbot.start();

  let testChat = 1;

  test('/start testing', () => {
    const telegramTest = new TelegramTester(telegramBot);
    return telegramTest.sendUpdate(testChat, '/start').then(data => {
      if (data.text.contains(/Welcome/i)) {
        return true;
      }
      throw new Error('Not started correctly.');
    });
  });

  test('/menu testing', () => {
    const telegramTest = new TelegramTester(telegramBot);
    return telegramTest.sendUpdate(testChat, '/menu').then(data => {
      if (data.text.contains(/Welcome/i)) {
        return true;
      }
      throw new Error('Not started correctly.');
    });
  });

  test('/slash_commands testing', () => {
    const telegramTest = new TelegramTester(telegramBot);
    return telegramTest.sendUpdate(testChat, '/slash_commands').then(data => {
      if (data.text.contains(/Select an option/i)) {
        return true;
      }
      throw new Error('Not answered correctly.');
    });
  });

  test('/subscribe testing', () => {
    const telegramTest = new TelegramTester(telegramBot);
    return telegramTest
      .sendUpdate(testChat, '/subscribe')
      .then(data => {
        if (data.text.contains(/Awesome!/i)) {
          return true;
        }
        throw new Error('Not answered correctly.');
      })
      .then(() =>
        telegramTest.sendUpdate(testChat, '/subscribe').then(data => {
          if (data.text.contains(/already subscribed/i)) {
            return true;
          }
          throw new Error('Not answered correctly.');
        })
      );
  });

  test('/unsubscribe testing', () => {
    const telegramTest = new TelegramTester(telegramBot);
    return telegramTest
      .sendUpdate(testChat, '/unsubscribe')
      .then(data => {
        if (data.text.contains(/From now/i)) {
          return true;
        }
        throw new Error('Not answered correctly.');
      })
      .then(() =>
        telegramTest.sendUpdate(testChat, '/subscribe').then(data => {
          if (data.text.contains(/Seems/i)) {
            return true;
          }
          throw new Error('Not answered correctly.');
        })
      );
  });

  test('/about testing', () => {
    const telegramTest = new TelegramTester(telegramBot);
    return telegramTest.sendUpdate(testChat, '/about').then(data => {
      if (data.text.contains(/Our social solidarity shop/i)) {
        return true;
      }
      throw new Error('Not answered correctly.');
    });
  });

  test('/help testing', () => {
    const telegramTest = new TelegramTester(telegramBot);
    return telegramTest.sendUpdate(testChat, '/help').then(data => {
      if (data.text.contains(/Help message/i)) {
        return true;
      }
      throw new Error('Not answered correctly.');
    });
  });

  test('/website testing', () => {
    const telegramTest = new TelegramTester(telegramBot);
    return telegramTest.sendUpdate(testChat, '/website').then(data => {
      if (data.text.contains(/Here it is!/i)) {
        return true;
      }
      throw new Error('Not answered correctly.');
    });
  });
});
