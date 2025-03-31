const { default: mongoose } = require("mongoose");

const hotelSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, reuqired: true },
  city: { type: String, reuqired: true },
  country: { type: String, reuqired: true },
  description: { type: String, reuqired: true },
  type: { type: String, reuqired: true },
  adultCount: { type: Number, reuqired: true },
  childCount: { type: Number, reuqired: true },
  facilities: { type: [String], reuqired: true },
  pricePerNight: { type: Number, reuqired: true },
  starRating: { type: Number, reuqired: true, min: 1, max: 5 },
  imageUrls: { type: [String], reuqired: true },
  lastUpdated: { type: Date, reuqired: true },
});

const Hotel = mongoose.model("Hotel", hotelSchema);

module.exports = Hotel;
