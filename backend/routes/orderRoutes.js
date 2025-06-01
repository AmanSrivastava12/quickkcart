const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Product = require("../models/Product");
const {
  sendApprovedEmail,
  sendDeclinedEmail,
  sendErrorEmail,
} = require("../utils/emailService");

router.post("/", async (req, res) => {
  try {
    const { productId, variant, quantity, customer, payment } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const orderNumber = `ORD-${Date.now()}`;

    let paymentStatus = "approved";
    if (payment.cardNumber === "2") {
      paymentStatus = "declined";
    } else if (payment.cardNumber === "3") {
      paymentStatus = "failed";
    }

    const order = new Order({
      orderNumber,
      product: {
        id: product._id,
        name: product.name,
        variant,
        quantity,
        price: product.price,
      },
      customer,
      payment: {
        cardLastFour: payment.cardNumber.slice(-4),
        amount: product.price * quantity,
        status: paymentStatus,
      },
    });

    await order.save();

    const variantIndex = product.variants.findIndex((v) => v.value === variant);
    if (variantIndex >= 0) {
      product.variants[variantIndex].inventory -= quantity;
      await product.save();
    }

    if (paymentStatus === "approved") {
      await sendApprovedEmail(order);
    } else if (paymentStatus === "declined") {
      await sendDeclinedEmail(order);
    } else {
      await sendErrorEmail(order);
    }

    res.status(201).json({ orderNumber, status: paymentStatus });
  } catch (err) {
    console.error("Order creation failed:", err);
    res.status(400).json({ message: err.message });
  }
});

router.get("/:orderNumber", async (req, res) => {
  try {
    const order = await Order.findOne({
      orderNumber: req.params.orderNumber,
    }).populate("product.id");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
