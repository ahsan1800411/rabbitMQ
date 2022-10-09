const express = require('express');
const app = express();
const amqp = require('amqplib');

const customerData = {
  customerId: 1,
  orderId: 2,
  number: '+92847456944884',
};

app.get('/', async (req, res) => {
  try {
    const connection = await amqp.connect('amqp://localhost:5672');
    const channel = await connection.createChannel();
    await channel.assertQueue('order.shipped');
    channel.sendToQueue(
      'order.shipped',
      Buffer.from(JSON.stringify(customerData))
    );
    res.send('ORDERS API');
  } catch (error) {
    console.log(error);
  }
});

app.listen(8000, () => {
  console.log('ORDERS API listening on port 8000');
});
