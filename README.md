# CST8915 Midterm Project - Algonquin Pet Store Extension


## 1. Video Presentation

- **YouTube Link:** [https://www.youtube.com/watch?v=92c-LDV2xBA]


## 2. Group Contribution

  Responsible for writing the source code of `order-analytics-service` using Node.js and Express. Set up the RabbitMQ consumer logic. Also responsible for the Local Testing part, configuring Ubuntu (WSL) environment, and successfully running all 4 services and RabbitMQ together to verify the system works perfectly before deploying.

## 3. Service Repositories
Here are the GitHub links to all our microservices:
- **Order Analytics Service (New):** https://github.com/Shan-AC/CST8915-midtermporject/tree/master/order-analytics-service
- **Store Front:** https://github.com/Shan-AC/store-front
- **Order Service:** https://github.com/Shan-AC/order-service
- **Product Service:** https://github.com/Shan-AC/product-service-python

## 4. RabbitMQ Consumer Pattern
For the `order-analytics-service`, we chose the **Work Queue** pattern. 

**why:**
The `order-service` publishes JSON messages to a default direct queue named `order_queue` with `durable: false`. Our new analytics service connects to this queue and continuously listens for new messages. This pattern is very easy to implement and is very good for background task processing. We also use `channel.ack(msg)` when receiving a message to make sure the order data is safely processed and not lost.

## 5.Local Setup and Testing

## 5.1 RabbitMQ Installation
Install RabbitMQ locally and ensure the four microservices are running in four different environments.
<img width="995" height="466" alt="23842e12-5844-49fd-ba98-d88abc40817c" src="https://github.com/user-attachments/assets/19868e5f-7d2a-472f-b5b7-19aa729f86b1" />



## 5.2 Start the Services

- **Product-Service:** Run `python app.py` (Port 5000).
- **Order-Service:** Run `npm start` (Port 3000).
- **Store-Front:** Run `npm run serve` (Port 8080).
- **Order-Analytics-Service:** Run `npm start` (Port 4000).
<img width="870" height="203" alt="Code_Q8Q3SIRGTI" src="https://github.com/user-attachments/assets/0432ca07-9e35-44ac-8eb2-e0c064ff2c68" />


## 5.3 Place Orders via Store-Front
Open `http://localhost:8080`, browse products, add items to the cart, and submit an order.
<img width="1073" height="865" alt="chrome_ipSUusUyxs" src="https://github.com/user-attachments/assets/2fdeda87-5456-4d28-9e2a-8c3b147de861" />



## 5.4 Verify Message in RabbitMQ
Check the management UI to verify messages are appearing in the `order_queue`.
<img width="703" height="726" alt="chrome_pTnkdY9md2" src="https://github.com/user-attachments/assets/03208061-d324-4b78-81a0-4ef82a6bf70c" />
<img width="539" height="256" alt="dd2f5eef173b1d82012b864dec433138" src="https://github.com/user-attachments/assets/bc000255-14f3-4806-9ac2-d472b96dcfc9" />
<img width="608" height="400" alt="c769eb7e233c9878032bb3d1fec77a3f" src="https://github.com/user-attachments/assets/b36786ad-90fc-4ad9-9d18-e9660a9d8642" />
<img width="533" height="369" alt="828672972aeb9b50f6186c10c4088ffa" src="https://github.com/user-attachments/assets/80545236-8471-4025-8024-ed0a90382bf7" />
<img width="872" height="879" alt="d84905c41389cf971068f9a3a10f8fca" src="https://github.com/user-attachments/assets/ae738bf4-7e7a-4dac-b143-7bf8a7b0296e" />


