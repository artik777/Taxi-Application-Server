const express = require("express");
const router = express.Router();
const Comment = require("../model/comment");
const Joi = require("joi");

//getting all comments
router.get("/comments", async (req, res) => {
  try {
    const comments = await Comment.find();
    await res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//getting one comments
router.get("/comments/:id", getComment, (req, res) => {
  res.json(res.comment);
});
//validate comments
const schema = Joi.object({
  name: Joi.string().min(2).max(20).required(),
  comment: Joi.string().min(5).max(500).required(),
  timestamp: Joi.date().timestamp(),
});
//post comment
router.post("/comments", async (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const comment = new Comment({
    name: req.body.name,
    comment: req.body.comment,
    timestamp: req.body.timestamp,
  });
  try {
    const newComment = comment.save();
    await res.status(201).json(newComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
//delele one comment
router.delete("/comment/:id", getComment, async (req, res) => {
  try {
    await res.comment.remove();
    res.status(200).json({ message: "Comment deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Middleware
async function getComment(req, res, next) {
  let comment;
  try {
    comment = await Comment.findById(req.params.id);
    if (comment == null) {
      return res.status(404).json({ message: "Cannot find comment" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message }); //something wrong with server
  }
  res.comment = comment;
  next();
}

module.exports = router;
