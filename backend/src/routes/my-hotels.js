const express = require("express");
const multer = require("multer");
const User = require("../models/hotel");
const cloudinary = require("cloudinary");
const Hotel = require("../models/hotel");
const verifyToken = require("../middleware/auth");
const { check, body, validationResult } = require("express-validator");

//we want to store files images that we get from post request in memory
//so we are going to directly upload to cloudinary and not store ourself
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, //5MB
  },
});

const router = express.Router();
router.post(
  "/",
  verifyToken,
  [
    body("name").notEmpty().withMessage("name is required"),
    body("city").notEmpty().withMessage("city is required"),
    body("country").notEmpty().withMessage("country is required"),
    body("description").notEmpty().withMessage("description is required"),
    body("type").notEmpty().withMessage("hotel type is required"),
    body("pricePerNight")
      .notEmpty()
      .isNumeric()
      .withMessage("pricePerNight is required"),
    body("facilities ")
      .notEmpty()
      .isArray()
      .withMessage("pricePerNight is required"),
  ],
  upload.array("imageFiles", 6),
  async (req, res) => {
    try {
      const imageFiles = req.files;
      const newHotel = req.body;
      //1. upload image to cloudinary
      const uploadPromises = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString("base64");
        let dataURI = "data:" + image.mimetype + ";base64," + b64;
        const res = await cloudinary.v2.uploader.upload(dataURI, {
          timeout: 120000,
        });
        return res.url;
      });
      //2. if upload was successful, add the URLs to the new hotel
      const imageUrls = await Promise.all(uploadPromises);
      newHotel.imageUrls = imageUrls;
      newHotel.lastUpated = new Date();

      newHotel.userId = req.userId; //we should not add id from frontend so we use from req.userId from auth

      //3. save the new hotel in our database
      const hotel = new Hotel(newHotel);
      await hotel.save();
      //4. return a 201 status
      res.status(201).send(hotel);
    } catch (err) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

router.get("/", verifyToken, async (req, res) => {
  const hotels = await Hotel.find({ userId: req.userId });
  res.json(hotels);
  try {
  } catch (err) {
    res.status(500).json({ message: "Error handlig" });
  }
});

module.exports = router;
