# CST8915 Midterm Project - Algonquin Pet Store Extension


## 1. Video Presentation

- **YouTube Link:** [https://www.youtube.com/watch?v=92c-LDV2xBA]


## 2. Group Contribution

  Responsible for writing the source code of `order-analytics-service` using Node.js and Express. Set up the RabbitMQ consumer logic. Also responsible for the Local Testing part, configuring Ubuntu (WSL) environment, and successfully running all 4 services and RabbitMQ together to verify the system works perfectly before deploying.

## 3. Service Repositories
Here are the GitHub links to all our microservices:
- **Order Analytics Service (New):** https://github.com/XinyiZhao-cloud/CST8915_MidtermProject
- **Store Front:** https://github.com/Shan-AC/store-front
- **Order Service:** https://github.com/Shan-AC/order-service
- **Product Service:** https://github.com/Shan-AC/product-service-python

## 4. RabbitMQ Consumer Pattern
For the `order-analytics-service`, we chose the **Work Queue** pattern. 

**why:**
The `order-service` publishes JSON messages to a default direct queue named `order_queue` with `durable: false`. Our new analytics service connects to this queue and continuously listens for new messages. This pattern is very easy to implement and is very good for background task processing. We also use `channel.ack(msg)` when receiving a message to make sure the order data is safely processed and not lost.

