const express = require("express");
const Hotel = require("../models/hotel");
const { check, param, validationResult } = require("express-validator");
const router = express.Router();

router.get("/search", async (req, res) => {
  try {
    const query = constructSearchQuery(req.query);
    //console.log(req.query.sortOption, "sortOpt");

    let sortOptions = {};
    switch (req.query.sortOption) {
      case "starRating":
        sortOptions = { starRating: -1 };
        break;
      case "pricePerNightAsc":
        sortOptions = { pricePerNight: 1 };
        break;
      case "pricePerNightDesc":
        sortOptions = { pricePerNight: -1 };
        break;
    }
    const pageSize = 5;
    const pageNumber = parseInt(
      req.query.page ? req.query.page.toString() : "1"
    );
    //console.log(req.query, "req");
    //console.log(query, "cons");
    const skip = (pageNumber - 1) * pageSize;

    //pageNumber 1 so skip = (1-1)*5 = 0 , 1 2 3 4 5
    //           2 so skip = (2-1)*5 = 5 , 6,7,8,9,10

    // const hotel = await Hotel.find({ city: req.query.destination });
    // console.log(hotel, "found1");
    // console.log(query, "queryobj");
    // {
    //   adultCount: { '$gte': 1 },
    //   type: { '$in': [ 'Budget', 'Luxury' ] },
    //   starRating: { '$in': 4 }
    // } queryobj
    const hotels = await Hotel.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(pageSize);
    //console.log(hotels, "founded");

    const total = await Hotel.countDocuments(query);

    const response = {
      data: hotels,
      pagination: {
        total,
        matchedDataLength: hotels.length,
        page: pageNumber,
        pages: Math.ceil(total / pageSize),
      },
    };
    res.json(response);
  } catch (Err) {
    //console.log(Err, "error");
    res.status(500).json({ message: "something went wrong" });
  }
});

const constructSearchQuery = (queryParams) => {
  let constructedQuery = {};

  if (queryParams.destination) {
    constructedQuery.$or = [
      { city: new RegExp(queryParams.destination, "i") },
      { country: new RegExp(queryParams.destination, "i") },
    ];
  }

  if (queryParams.adultCount) {
    constructedQuery.adultCount = {
      $gte: parseInt(queryParams.adultCount),
    };
  }

  if (queryParams.childCount) {
    constructedQuery.childCount = {
      $gte: parseInt(queryParams.childCount),
    };
  }

  if (queryParams.facilities) {
    constructedQuery.facilities = {
      $all: Array.isArray(queryParams.facilities)
        ? queryParams.facilities
        : [queryParams.facilities],
    };
  }

  if (queryParams.types) {
    //console.log(queryParams.types, "qpt");

    constructedQuery.type = {
      $in: Array.isArray(queryParams.types)
        ? queryParams.types
        : [queryParams.types],
    };
    //console.log(constructedQuery.type, "cst");
    // if u selected one type
    // Budget qpt , { '$in': [ 'Budget' ] } cst for 1
    // if u selected 2 types
    // [ 'Budget', 'Luxury' ] qpt , { '$in': [ 'Budget', 'Luxury' ] } cst
  }

  if (queryParams.stars) {
    const starRatings = Array.isArray(queryParams.stars)
      ? queryParams.stars.map((star) => parseInt(star))
      : parseInt(queryParams.stars);

    constructedQuery.starRating = { $in: starRatings };
  }

  if (queryParams.maxPrice) {
    constructedQuery.pricePerNight = {
      $lte: parseInt(queryParams.maxPrice).toString(),
    };
  }

  return constructedQuery;
};

module.exports = router;

router.get(
  "/:id",
  [param("id").notEmpty().withMessage("Hotel ID is required")],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = req.params.id.toString();
    try {
      const hotel = await Hotel.findById(id);
      res.json(hotel);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "error fetching hotel" });
    }
  }
);
