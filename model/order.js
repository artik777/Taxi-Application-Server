const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 2,
    max: 20,
  },
  surname: {
    type: String,
    required: true,
    min: 2,
    max: 20,
  },
  category: {
    type: String,
    required: true,
  },
  carModel: {
    type: String,
    required: true,
  },
  orderQuantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  timespent: {
    type: Number,
  },
  ordernr: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    min: 9,
    max: 12,
  },
  pickupAddress: {
    type: String,
    required: true,
    min: 10,
    max: 50,
  },
  destinationAddress: {
    type: String,
    required: true,
    min: 10,
    max: 50,
  },
  time: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    max: 50,
  },
  computer: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Order", orderSchema);
