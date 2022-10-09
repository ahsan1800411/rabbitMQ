const express = require('express');
const amqp = require('amqplib');

const app = express();

app.get('/', (req, res) => {
  res.send('NOTIFCATIONS API');
});

async function connect() {
  try {
    const connection = await amqp.connect('amqp://localhost:5672');
    const channel = await connection.createChannel();
    await channel.assertQueue('order.shipped');
    channel.consume('order.shipped', (message) => {
      console.log(message.content.toString());
    });
  } catch (error) {
    console.log(error);
  }
}

connect();

app.listen(8001, () => {
  console.log('Listening on PORT 8001');
});
