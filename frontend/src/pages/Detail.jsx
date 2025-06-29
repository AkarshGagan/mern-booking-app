import { useParams } from "react-router-dom";
import { fetchHotelById } from "../api-client";
import { useQuery } from "@tanstack/react-query";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import GuestInfoFrom from "../forms/GuestInfoFrom/GuestInfoFrom";

function Detail() {
  const { hotelId } = useParams();
  console.log(hotelId);

  const {
    data: hotelData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["fetchHotelByID", hotelId],
    queryFn: () => fetchHotelById(hotelId),
    enabled: !!hotelId,
  });

  console.log(hotelData);

  console.log(isLoading);

  return (
    <div>
      {hotelData && (
        <div className="space-y-3">
          <div>
            <span className="flex">
              {Array.from({ length: hotelData?.starRating }, (data, index) => (
                <div key={index}>
                  <AiFillStar fill="blue"></AiFillStar>
                </div>
              ))}
            </span>
            <h1 className="text-3xl font-bold">{hotelData?.name}</h1>
          </div>
          <div className="grid  grid-cols-1 lg:grid-cols-3 gap-4">
            {hotelData.imageUrls.map((image, index) => {
              return (
                <div key={index}>
                  <img
                    src={image}
                    alt={hotelData?.name}
                    className="rounded-md w-full h-full object-cover object-center"
                  />
                </div>
              );
            })}
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            {hotelData.facilities.map((data, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-row border-2 border-slate-800 px-2 py-1 text-lg"
                >
                  {data}
                </div>
              );
            })}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
            <div className="whitespacee-pre-wrap text-xl">
              {hotelData.description}
            </div>
            <div className="h-fit">
              <GuestInfoFrom
                pricePerNight={hotelData.pricePerNight}
                hotelId={hotelData._id}
              />
            </div>
          </div>
        </div>
      )}{" "}
    </div>
  );
}

export default Detail;
