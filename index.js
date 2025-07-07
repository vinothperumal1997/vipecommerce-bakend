const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db.js");
const router = require("./routes");
const cookieParser = require("cookie-parser");
const app = express();
connectDB();
app.use(express.json());
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use("/api", router);
app.get("/", (req, res) => {
  res.send("Welcome to the API");
});
const PORT = 8081;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log("MongoDB connected");
});
