# MERN Stack E-commerce Project

This is a full-stack MERN (MongoDB, Express, React, Node.js) e-commerce application. It includes user registration, product catalog, cart, checkout with payment simulation, and order confirmation.

# Tech Stack

- **Frontend:** React, React Router
- **Backend:** Node.js, Express
- **Database:** MongoDB (with Mongoose)
- **Styling:** CSS
- **Email:** Nodemailer (Mailtrap)

# Prerequisites

Before starting, make sure you have the following installed:

- Node.js and npm
- MongoDB (local or MongoDB Atlas)
- Nodemon (for backend auto-reloading)
- Mailtrap (for sending emails)

Create .env file for the backend

MONGODB_URI=mongodb://localhost:27017/ecommerce
PORT=5000
MAILTRAP_HOST=live.smtp.mailtrap.io
MAILTRAP_PORT=587
MAILTRAP_USER=api
MAILTRAP_PASS=**YOUR-MAILTRAP-TOKEN**
MAILTRAP_DOMAIN=**YOUR-MAILTRAP-DOMAIN**

# Getting Started

# 1. Clone the repository

```
git clone https://github.com/AmanSrivastava/your-repo-name.git
cd your-repo-name
```

# 2. Frontend dependencies

```
npm install
```

# 3. Backend dependencies

```
cd backend
npm install
```

# 4. Seed the Database

```
cd backend
node seed.js
```

# 5. Run the application

```
cd backend
nodemon server.js

cd ../
npm start
```

# 6. Start MongoDB

```
mongod

```
