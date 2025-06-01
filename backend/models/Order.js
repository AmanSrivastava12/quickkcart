const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
    unique: true,
  },
  product: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    name: String,
    variant: String,
    quantity: Number,
    price: Number,
  },
  customer: {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
  },
  payment: {
    cardLastFour: String,
    amount: Number,
    status: {
      type: String,
      enum: ["approved", "declined", "failed"],
      required: true,
    },
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
