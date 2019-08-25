const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

// init express
const app = express();

//cors policy
app.use(cors());
//body purser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB config
const db = config.get("MongoURI");

//connect to mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log("MongoDB connected..."));

//routes
app.use("/api/shoes", require("./routes/api/shoes"));
app.use("/api/cart", require("./routes/api/cart"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/order", require("./routes/api/order"));

app.use(express.static("public"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

//Listen to a port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
