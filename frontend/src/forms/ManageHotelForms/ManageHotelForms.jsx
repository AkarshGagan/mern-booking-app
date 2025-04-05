import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";
import { useEffect } from "react";

function ManageHotelForms({ onSave, isLoading, hotel }) {
  const formMethods = useForm();
  const { handleSubmit, reset } = formMethods;

  useEffect(() => {
    reset(hotel);
  }, [hotel, reset]);

  function onSubmit(formadataJson) {
    const formdata = new FormData();

    if (hotel) {
      formdata.append("hotelId", hotel._id);
    }
    formdata.append("name", formadataJson.name);
    formdata.append("city", formadataJson.city);
    formdata.append("country", formadataJson.country);
    formdata.append("description", formadataJson.description);
    formdata.append("type", formadataJson.type);
    formdata.append("pricePerNight", formadataJson.pricePerNight.toString());
    formdata.append("starRating", formadataJson.starRating.toString());
    formdata.append("adultCount", formadataJson.adultCount.toString());
    formdata.append("childCount", formadataJson.childCount.toString());

    formadataJson.facilities.forEach((facility, index) => {
      formdata.append(`facilities[${index}]`, facility);
    });

    if (formadataJson.imageUrls) {
      formadataJson.imageUrls.forEach((url, index) => {
        formdata.append(`imageUrls[${index}]`, url);
      });
    }

    Array.from(formadataJson.imageFiles).forEach((imageFile) => {
      formdata.append(`imageFiles`, imageFile);
    });
    onSave(formdata);
  }

  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <DetailsSection />
        <TypeSection />
        <FacilitiesSection />
        <GuestsSection />
        <ImagesSection />
        <span className="flex justify-end">
          <button
            disabled={isLoading}
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 font-bold hover:bg-blue-500 text-xl disabled:bg-gray-600"
          >
            {" "}
            {isLoading ? "Saving..." : "Save"}
          </button>
        </span>
      </form>
    </FormProvider>
  );
}

export default ManageHotelForms;
