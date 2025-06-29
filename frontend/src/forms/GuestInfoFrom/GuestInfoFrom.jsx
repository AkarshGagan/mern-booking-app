import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { useSearchContext } from "../../contexts/SearchContext";
import { useAppContext } from "../../contexts/AppContext";
import { useLocation, useNavigate } from "react-router-dom";

function GuestInfoForm({ hotelId, pricePerNight }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn } = useAppContext();
  const search = useSearchContext();

  const {
    watch,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      adultCount: search.adultCount,
      childCount: search.childCount,
    },
  });

  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 6);

  const onSignInClick = (data) => {
    search.saveSearchValues(
      "",
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount
    );
    navigate("/sign-in", { state: { from: location } });
  };

  const onSubmit = (data) => {
    search.saveSearchValues(
      "",
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount
    );
    navigate(`/hotel/${hotelId}/booking}`, { state: { from: location } });
  };

  return (
    <div className="flex flex-col p-4 bg-blue-200 gap-4 m-2">
      <h3 className="text-md font-bold">${pricePerNight}</h3>
      <form
        onSubmit={
          isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onSignInClick)
        }
      >
        <div className="grid grid-cols-1 gap-4 items-center">
          <div>
            <DatePicker
              selected={checkIn}
              onChange={(date) => setValue("checkIn", date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Check-in Date"
              className="w-full bg-white p-2 focus:outline-none"
              wrapperClassName="w-full"
            />
          </div>
          <div>
            <DatePicker
              selected={checkOut}
              onChange={(date) => setValue("checkOut", date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Check-out Date"
              className="w-full bg-white p-2 focus:outline-none"
              wrapperClassName="w-full"
            />
          </div>
          <div className="flex bg-white px-2 py-1 gap-2">
            <label className="items-center flex">
              Adults:
              <input
                className="w-full p-1 focus:outline-none font-bold"
                type="number"
                min={1}
                max={20}
                {...register("adultCount", {
                  required: "This field is required",
                  min: {
                    value: 1,
                    message: "There must be atleast one adult",
                  },
                  valueAsNumber: true,
                })}
              />
            </label>
            {errors.adultCount && (
              <span className=" text-red-500 font-semibold text-sm">
                {errors.adultCount.message}
              </span>
            )}
            <label className="items-center flex">
              Children:
              <input
                className="w-full p-1 focus:outline-none font-bold"
                type="number"
                min={0}
                max={20}
                {...register("childCount", {
                  valueAsNumber: true,
                })}
              />
            </label>
          </div>
        </div>
        <div className="text-center mt-4">
          {isLoggedIn ? (
            <button
              className="border rounded-md
             p-2 bg-blue-700 text-white"
            >
              Book Now
            </button>
          ) : (
            <button
              className="border rounded-md
            p-2 bg-blue-700 text-white"
              onClick={onSignInClick}
            >
              Sign In
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default GuestInfoForm;
