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

const uploadImagestoCloudinary = async (imageFiles) => {
  const uploadPromises = imageFiles.map(async (image) => {
    const b64 = Buffer.from(image.buffer).toString("base64");
    let dataURI = "data:" + image.mimetype + ";base64," + b64;
    const res = await cloudinary.v2.uploader.upload(dataURI, {
      timeout: 120000,
    });
    return res.url;
  });
  const imageUrls = await Promise.all(uploadPromises);
  return imageUrls;
};

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
      const imageUrls = await uploadImagestoCloudinary(imageFiles);
      //2. if upload was successful, add the URLs to the new hotel
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

router.get("/:id", verifyToken, async (req, res) => {
  const id = req.params.id.toString();
  const hotel = await Hotel.findOne({
    _id: id,
    userId: req.userId,
  });
  res.json(hotel);
  try {
  } catch (err) {
    res.json(500).json({ messgae: "Errro fetching hotels" });
  }
});

router.put(
  "/:id",
  verifyToken,
  upload.array("imageFiles"),
  async (req, res) => {
    try {
      const updatedHotel = req.body;
      updatedHotel.lastUpated = new Date();
      const hotelId = req.params.id.toString();
      const hotel = await Hotel.findOneAndUpdate(
        {
          _id: hotelId,
          userId: req.userId,
        },
        updatedHotel,
        { new: true }
      );

      if (!hotel) {
        return res.status(404).json({ message: "Hotel not found" });
      }

      const files = req.files;
      const updateImageUrls = await uploadImagestoCloudinary(files);
      hotel.imageUrls = [...updateImageUrls, ...(updatedHotel.imageUrls || [])];

      await hotel.save();
      res.status(201).json(hotel);
    } catch (err) {
      res.json(500).json({ messgae: "Errro fetching hotels" });
    }
  }
);
module.exports = router;
