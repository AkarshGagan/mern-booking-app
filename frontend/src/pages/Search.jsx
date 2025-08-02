import React, { useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { searcHotels } from "../api-client";
import { useQuery } from "@tanstack/react-query";
import SearchResultCard from "../components/SearchResultCard";
import Pagination from "../components/Pagination";
import StarRatingFilter from "../components/StarRatingFilter";
import FacilitiesFilter from "../components/FacilitiesFilter";
import HotelTypesFilter from "../components/HotelTypesFilter";
import PriceFilter from "../components/PriceFilter";
import Loader from "../components/Loader";

function Search() {
  const [page, setPage] = useState(1);
  const [selectedStars, setSelectedStars] = useState([]);
  const [selectedHotelTypes, setselectedHotelTypes] = useState([]);
  const [selectedHotelFacility, setselectedHotelFacility] = useState([]);
  const [selectedPrice, setselectedPrice] = useState([]);
  const [sortOption, setSortOption] = useState("");

  const { destination, checkIn, checkOut, adultCount, childCount, hotelId } =
    useSearchContext();

  const searchParams = {
    destination,
    checkIn: checkIn.toISOString(),
    checkOut: checkOut.toISOString(),
    adultCount,
    childCount,
    hotelId,
    page: page.toString(),
    stars: selectedStars,
    types: selectedHotelTypes,
    facilities: selectedHotelFacility,
    maxPrice: selectedPrice,
    sortOption,
  };

  //console.log(searchParams);

  const { data: hotelData, isPending } = useQuery({
    queryKey: ["searchHotels", searchParams],
    queryFn: () => searcHotels(searchParams),
  });
  console.log(isPending, "isp");

  // console.log(hotelData, "hotelData");

  const handleStarsChange = (e) => {
    const starRating = e.target.value;
    //console.log(starRating, "str");

    setSelectedStars((prevStars) =>
      e.target.checked
        ? [...prevStars, starRating]
        : prevStars.filter((star) => star !== starRating)
    );
  };

  const handlehotelChange = (e) => {
    const hotelTypes = e.target.value;

    setselectedHotelTypes((prevHotels) =>
      e.target.checked
        ? [...prevHotels, hotelTypes]
        : prevHotels.filter((hotel) => hotel !== hotelTypes)
    );
  };

  const handleFacilityChange = (e) => {
    const facility = e.target.value;

    setselectedHotelFacility((prevFacility) =>
      e.target.checked
        ? [...prevFacility, facility]
        : prevFacility.filter((prevfacility) => prevfacility !== facility)
    );
  };

  //console.log(selectedStars, "selstr");

  if (isPending) {
    return <Loader />;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div className="rounded-lg bg-blue-600  text-white border border-slate-900 p-5 h-fit sticky top-10">
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
            Filter by:
          </h3>
          <StarRatingFilter
            selectedStar={selectedStars}
            onChange={handleStarsChange}
          />
          <HotelTypesFilter
            selectedHotelTypes={selectedHotelTypes}
            onChange={handlehotelChange}
          />
          <FacilitiesFilter
            selectedHotelFacility={selectedHotelFacility}
            onChange={handleFacilityChange}
          />
          <PriceFilter
            selectedPrice={selectedPrice}
            onChange={(value) => setselectedPrice(value)}
          />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">
            {hotelData?.pagination.total} Hotels found
            {destination ? ` in ${destination}` : ""}
          </span>
          {hotelData.data.length > 0 && (
            <select
              name=""
              id=""
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="p-2 border rounded-md"
            >
              <option value="">Sort By</option>
              <option value="starRating">Rating (high to low)</option>
              <option value="pricePerNightAsc">
                Price Per Night (low to high)
              </option>
              <option value="pricePerNightDesc">
                Price Per Night (high to low)
              </option>
            </select>
          )}
        </div>
        {hotelData?.data.map((hotel, index) => {
          return (
            <SearchResultCard isPending={isPending} key={index} hotel={hotel} />
          );
        })}
        <div>
          {hotelData.data.length > 0 && (
            <Pagination
              page={hotelData?.pagination.page || 1}
              pages={hotelData?.pagination.pages || 1}
              onPageChange={(page) => setPage(page)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;
