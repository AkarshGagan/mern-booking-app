import { useQuery } from "@tanstack/react-query";
import { fetchCurrentUser, fetchHotelById } from "../api-client";
import BookingForm from "../forms/BookingForm/BookingForm";
import Loader from "../components/Loader";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import BookingDetailsSummary from "../components/BookingDetailsSummary";
function Booking() {
  const { data: currentUser, isPending } = useQuery({
    queryKey: ["fetchCurrentUser", fetchCurrentUser],
    queryFn: () => fetchCurrentUser(),
  });

  const { hotelId } = useParams();
  const [numberOfNight, setNumberOfNights] = useState(0);
  const { data: hotelData } = useQuery({
    queryKey: ["fetchHotelByID", hotelId],
    queryFn: () => fetchHotelById(hotelId),
    enabled: !!hotelId,
  });

  const search = useSearchContext();
  useEffect(() => {
    if (search.checkIn && search.checkOut) {
      const nights =
        Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) /
        (1000 * 60 * 60 * 24);

      setNumberOfNights(Math.ceil(nights));
    }
  }, [search.checkIn, search.checkOut]);

  // console.log(currentUser, "cu");
  if (isPending) {
    return <Loader />;
  }

  return (
    <div className="grid md:grid-cols-[1fr_2fr] gap-[30px]">
      <BookingDetailsSummary
        checkIn={search.checkIn}
        checkOut={search.checkOut}
        adultCount={search.adultCount}
        childCount={search.childCount}
        numberOfNight={numberOfNight}
        hotel={hotelData}
      />
      <BookingForm currentUser={currentUser} />
    </div>
  );
}

export default Booking;
