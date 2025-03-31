const express = require("express");
const User = require("../models/users");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const router = express.Router();

router.post(
  "/register",
  check("firstName", "First Name is required").isString(),
  check("lastName", "Last Name is required").isString(),
  check("email", "Email is required").isEmail(),
  check("password", "Password with 6 or more characters r equired").isLength({
    min: 6,
  }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    try {
      let user = await User.findOne({
        email: req.body.email,
      });
      if (user) {
        return res.status(400).json({
          message: "User already exists",
        });
      }
      user = new User(req.body);
      await user.save();
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1d",
      });
      res.cookie("auth_token", token, {
        httpOnly: true, //httpOnly: true means JavaScript in the browser cannot access this, so i didnt see anything under brwoser cookes
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      });
      return res.status(200).json({ message: "success" });
    } catch (err) {
      res.status(500).send({
        mesage: "Something went wrong",
      });
    }
  }
);

module.exports = router;
