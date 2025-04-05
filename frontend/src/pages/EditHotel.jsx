import { useParams } from "react-router-dom";
import { fetchMyHotelById, updateMyHotelById } from "../api-client";
import { useMutation, useQuery } from "@tanstack/react-query";
import ManageHotelForms from "../forms/ManageHotelForms/ManageHotelForms";
import { useAppContext } from "../contexts/AppContext";

function EditHotel() {
  const { hotelId } = useParams();

  const { showToast } = useAppContext();
  const {
    data: hotelData,
    // isError,
    // isLoading,
  } = useQuery({
    queryKey: ["fetchMyHotelById"],
    queryFn: () => fetchMyHotelById(hotelId || ""),
    enabled: !!hotelId,
  });

  const mutation = useMutation({
    mutationFn: updateMyHotelById,
    onSuccess: async () => {
      // await queryClient.invalidateQueries("validateToken");
      showToast({ message: "Hotel Saved", type: "SUCCESS" });
    },
    onError: () => {
      showToast({ message: "Something went wrong", type: "Error" });
    },
  });

  const handleSave = (hotelData) => {
    mutation.mutate(hotelData);
  };

  return (
    <ManageHotelForms
      hotel={hotelData}
      onSave={handleSave}
      isLoading={mutation.isPending}
    />
  );
}

export default EditHotel;
