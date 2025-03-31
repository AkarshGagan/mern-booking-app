const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv/config");
const mongoose = require("mongoose");
const userRoutes = require("./routes/users");
const myHotelRoutes = require("./routes/my-hotels");
const authRoutes = require("./routes/auth");
const cookieparser = require("cookie-parser");
const path = require("path");
const cloudinary = require("cloudinary");
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
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
app.use("/api/my-hotels", myHotelRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname), "../../frontend/dist/index.html");
});

app.listen(7000, () => {
  console.log("port is running on port:7000");
});
