const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/user");

//VALIDATION
const Joi = require("joi");

const schema = Joi.object({
  email: Joi.string().max(50).required().email(),
  password: Joi.string().min(6).max(24).required(),
});

//Register
router.post("/user/register", async (req, res, next) => {
  //LETS VALIDATE THE DATA BEFORE A USER
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Checking if the user is already in the database
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exists");

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10); //10 is salt length.
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    user.save();
    await res.status(201).json({ user: user._id });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Login

router.post("/user/login", async (req, res, next) => {
  //LETS VALIDATE THE DATA BEFORE A USER
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //Checking if email doesn't exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email doesn't exists");
  //Password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid password");

  //Create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);
});

module.exports = router;
