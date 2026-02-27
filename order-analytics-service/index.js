require('dotenv').config();
const express = require('express');
const amqp = require('amqplib');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
const RABBITMQ_URL = process.env.RABBITMQ_CONNECTION_STRING;

let ordersDatabase = [];


async function connectRabbitMQ() {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();
        const queue = 'order_queue';

        await channel.assertQueue(queue, { durable: false });
        console.log(`[*] Successfully connected to RabbitMQ. Waiting for messages in '${queue}'.`);

        channel.consume(queue, (msg) => {
            if (msg !== null) {
                const orderData = JSON.parse(msg.content.toString());
                console.log(" [x] Received new order:", orderData);
                ordersDatabase.push(orderData);
                channel.ack(msg);
            }
        });
    } catch (error) {
        console.error("RabbitMQ Connection Error, retrying...", error.message);
        setTimeout(connectRabbitMQ, 5000);
    }
}



app.get('/health', (req, res) => {
    res.json({ status: "Order Analytics Service is Healthy", port: PORT });
});

app.get('/orders', (req, res) => {
    res.json(ordersDatabase);
});

app.get('/analytics/summary', (req, res) => {
    const totalOrders = ordersDatabase.length;
    const totalRevenue = ordersDatabase.reduce((sum, order) => sum + order.totalPrice, 0);
    const averageOrderValue = totalOrders > 0 ? (totalRevenue / totalOrders) : 0;
    res.json({
        totalOrders,
        totalRevenue: parseFloat(totalRevenue.toFixed(2)),
        averageOrderValue: parseFloat(averageOrderValue.toFixed(2))
    });
});

app.get('/analytics/products', (req, res) => {
    const productStats = {};
    ordersDatabase.forEach(order => {
        const name = order.product.name;
        if (!productStats[name]) {
            productStats[name] = { productName: name, orderCount: 0, totalRevenue: 0 };
        }
        productStats[name].orderCount += 1;
        productStats[name].totalRevenue += order.totalPrice;
    });
    const result = Object.values(productStats).map(p => ({
        ...p,
        totalRevenue: parseFloat(p.totalRevenue.toFixed(2))
    }));
    res.json(result);
});

app.get('/analytics/top-products', (req, res) => {
    const quantityStats = {};
    ordersDatabase.forEach(order => {
        const name = order.product.name;
        if (!quantityStats[name]) {
            quantityStats[name] = { productName: name, totalQuantity: 0 };
        }
        quantityStats[name].totalQuantity += order.quantity;
    });
    const result = Object.values(quantityStats)
        .sort((a, b) => b.totalQuantity - a.totalQuantity)
        .slice(0, 3);
    res.json(result);
});

app.listen(PORT, () => {
    console.log(`Order Analytics Service running on port ${PORT}`);
    connectRabbitMQ();
});