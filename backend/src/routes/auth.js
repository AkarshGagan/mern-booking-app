const express = require("express");
const User = require("../models/users");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const verifyToken = require("../middleware/auth");
const router = express.Router();

router.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters r equired").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user || !(await user.correctPassword(password, user.password))) {
        return res.status(400).json({
          message: "Invalid email or password",
        });
      }
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
        //actually its user._id but in moongose its Auto-converted alias for user._id.toString()
        expiresIn: "1d",
      });
      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      });
      res.status(200).json({
        userrid: user._id,
      });
    } catch (err) {
      res.status(500).json({
        Error: err,
      });
    }
  }
);

router.get("/validate-token", verifyToken, (req, res) => {
  res.status(200).send({ userId: req.userId });
});

router.post("/logout", (req, res) => {
  res.cookie("auth_token", "", {
    expires: new Date(0),
  });
  res.send();
});

module.exports = router;
