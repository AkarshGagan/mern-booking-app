import { useFormContext } from "react-hook-form";
import { hotelFacilities } from "../../config/hote-options-config";

function FacilitiesSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-7 mt-4">Facilities</h2>
      <hr className="mb-5 border-black" />
      <div className="grid grid-cols-5 gap-3">
        {hotelFacilities.map((facility) => (
          <div key={facility}>
            <label className="text-sm flex gap-1 text-gray-700">
              <input
                type="checkbox"
                value={facility}
                {...register("facilities", {
                  validate: (facilities) => {
                    if (facilities && facilities.length > 0) {
                      return true;
                    } else {
                      return "At least one facility is required";
                    }
                  },
                })}
              />
              {facility}
            </label>
          </div>
        ))}
      </div>
      {errors.facilities && (
        <span className="text-red-500 text-sm font-bold">
          {errors.facilities.message}
        </span>
      )}
    </div>
  );
}

export default FacilitiesSection;
