// file for seeding the database
const mongoose = require("mongoose");
const Product = require("./models/Product");
require("dotenv").config();

const productData = {
  name: "High Top Men's Sneakers",
  description: "Classic high-top sneakers with modern comfort",
  price: 799,
  image: "/productImages/sneakers.jpg",
  variants: [
    { name: "Color", value: "Black", inventory: 100 },
    { name: "Color", value: "White", inventory: 150 },
    { name: "Color", value: "Red", inventory: 75 },
  ],
};

mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    await Product.deleteMany();
    const product = new Product(productData);
    await product.save();
    console.log("Database seeded!");
    process.exit();
  })
  .catch((err) => {
    console.error("Seeding error:", err);
    process.exit(1);
  });
