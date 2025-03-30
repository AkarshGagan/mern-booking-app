const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv/config");
const mongoose = require("mongoose");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const akarshRoutes = require("./routes/bath");
const cookieparser = require("cookie-parser");
const path = require("path");
async function awaitConnectToDb() {
  await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
}
awaitConnectToDb()
  .then(() => console.log("connected to db"))
  .catch((err) => console.log(err));

const app = express();
app.use(cookieparser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.static(path.join(__dirname, "../../frontend/dist")));
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/akarsh", akarshRoutes);

app.listen(7000, () => {
  console.log("port is running on port:7000");
});
