const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

mongoose.connect(process.env.DB_CONNECT, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to DB"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

//Middleware
app.use(express.json());

//Import Routes
const userRoutes = require("./routes/user.js");
const commentRoutes = require("./routes/comment.js");

//Route Middlewares
app.use("/api", userRoutes);
app.use("/api", commentRoutes);


app.listen(process.env.PORT || 5000);
