const express = require("express");
const User = require("../models/users");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const verifyToken = require("../middleware/auth");
const router = express.Router();

router.get("/me", (req, res) => {
  res.status(200).json({
    message: "success",
  });
});

module.exports = router;
