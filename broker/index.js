'use strict';

require('dotenv').config();
const amqplib = require('amqplib');

const { MB_URL } = process.env;

let brokerConnection = null;

const initBroker = (url) => new Promise(async (resolve, reject) => {
  try {
    const connection = await amqplib.connect(url);
    resolve(connection);
  } catch (error) {
    console.warn(error);
    reject(error);
  }
});

const notify = async (queue, obj) => {
  if (!brokerConnection) {
    try {
      brokerConnection = await initBroker(MB_URL);
    } catch (error) {
      console.error('Failed to init broker connection');
      return;
    }
  }

  await brokerConnection.createChannel()
    .then(ch => ch.assertQueue(queue)
      .then(() => {
        ch.sendToQueue(queue, Buffer.from(JSON.stringify(obj)));
        console.log(`[PUBLISHER] - Sent ${JSON.stringify(obj)}`);
      })
    ).catch(console.warn);
}

const jsonlog = (obj) => {
  if (typeof obj === 'object') {
    console.log(JSON.stringify(obj, '', 2));
  }
}

const subscribe = async () => {
  if (!brokerConnection) {
    try {
      brokerConnection = await initBroker(MB_URL);
    } catch (error) {
      console.error('Failed to init broker connection');
      return;
    }
  }

  const subscriptions = [
    { queue: 'brand-created', callback: jsonlog },
    { queue: 'brand-updated', callback: jsonlog },
    { queue: 'brand-deleted', callback: jsonlog },
    { queue: 'store-created', callback: jsonlog },
    { queue: 'store-updated', callback: jsonlog },
    { queue: 'store-deleted', callback: jsonlog },
  ];

  subscriptions.forEach(({ queue, callback }) => {
    brokerConnection.createChannel()
      .then((ch) => ch.assertQueue(queue)
        .then((_ok) => ch.consume(queue, async (msg) => {
          if (msg !== null) {
            const content = JSON.parse(msg.content.toString());

            callback(content);

            console.log(`[CONSUMER] Acknowledged ${JSON.stringify(content)}`);
          }
        }, { noAck: true }))
      ).catch(console.warn);
  });
}

module.exports = {
  notify,
  subscribe,
};
