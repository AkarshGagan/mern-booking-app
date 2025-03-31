import { useMutation } from "@tanstack/react-query";
import ManageHotelForms from "../forms/ManageHotelForms/ManageHotelForms";
import { addMyHotel } from "../api-client";
import { useAppContext } from "../contexts/AppContext";
function AddHotel() {
  const { showToast } = useAppContext();

  const { mutate, isPending } = useMutation({
    mutationFn: addMyHotel,
    onSuccess: async () => {
      showToast({ message: "Hotel-Saved", type: "SUCCESS" });
    },
    onError: () => {
      showToast({ message: "Error saving Hotel", type: "Error" });
    },
  });

  function handleSave(hotelFormData) {
    mutate(hotelFormData);
  }
  return (
    <div>
      <ManageHotelForms onSave={handleSave} isLoading={isPending} />
    </div>
  );
}

export default AddHotel;
