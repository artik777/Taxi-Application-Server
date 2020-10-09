const express = require("express");
const router = express.Router();
const verify = require("./verifyToken");
const Order = require("../model/order");
const Joi = require("joi");

//getting all order
router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find();
    await res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//getting one order
router.get("/orders/:id", getOrder, (req, res) => {
  res.json(res.order);
});

const schema = Joi.object({
  name: Joi.string().min(2).max(40).required(),
  surname: Joi.string().min(2).max(40).required(),
  category: Joi.string().required(),
  carModel: Joi.string().required(),
  orderQuantity: Joi.number().required(),
  price: Joi.number().required(),
  timespent: Joi.number().required(),
  ordernr: Joi.string().required(),
  phone: Joi.string().min(9).max(12).required(),
  pickupAddress: Joi.string().min(5).max(50).required(),
  destinationAddress: Joi.string().min(5).max(50).required(),
  time: Joi.string().required(),
  timearrived: Joi.string().required(),
  date: Joi.string().required(),
  email: Joi.string().max(50).required().email(),
  computer: Joi.string().required(),
  timestamp: Joi.string().required(),
  status: Joi.string().required(),
});

//post to order
router.post("/orders", verify, async (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const order = new Order({
    name: req.body.name,
    surname: req.body.surname,
    category: req.body.category,
    carModel: req.body.carModel,
    orderQuantity: req.body.orderQuantity,
    price: req.body.price,
    timespent: req.body.timespent,
    ordernr: req.body.ordernr,
    phone: req.body.phone,
    pickupAddress: req.body.pickupAddress,
    destinationAddress: req.body.destinationAddress,
    time: req.body.time,
    timearrived: req.body.timearrived,
    date: req.body.date,
    email: req.body.email,
    computer: req.body.computer,
    timestamp: req.body.timestamp,
    status: req.body.status,
  });
  try {
    const newOrder = order.save();
    await res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//update one order
router.patch("/orders/:id", getOrder, async (req, res) => {
  res.order.timearrived = req.body.timearrived;
  if (req.body.status != null) {
    res.order.status = req.body.status;
  }
  try {
    const updatedOrder = await res.order.save();
    res.json(updatedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//delele one order
router.delete("/orders/:id", getOrder, async (req, res) => {
  try {
    await res.order.remove();
    res.status(200).json({ message: "Order deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Middleware
async function getOrder(req, res, next) {
  let order;
  try {
    order = await Order.findById(req.params.id);
    if (order == null) {
      return res.status(404).json({ message: "Cannot find order" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message }); //something wrong with server
  }
  res.order = order;
  next();
}

module.exports = router;
