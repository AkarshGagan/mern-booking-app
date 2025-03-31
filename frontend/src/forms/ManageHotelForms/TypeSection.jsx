import { useFormContext } from "react-hook-form";
import { hotelTypes } from "../../config/hote-options-config";

function TypeSection() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const typeWatch = watch("type");

  return (
    <div>
      <h2 className="text-2xl font-bold mb-7">Type</h2>
      <hr className="mb-5" />
      <div className="grid grid-cols-4 gap-2">
        {hotelTypes.map((type) => (
          <div key={type}>
            <label
              className={
                typeWatch === type
                  ? "cursor-pointer bg-blue-300 text-sm rounded-full px-4 py-2 font-semibold w-30 flex justify-center items-center"
                  : "cursor-pointer bg-gray-300 text-sm rounded-full px-4 py-2 font-semibold w-30 flex justify-center items-center"
              }
            >
              <input
                type="radio"
                value={type}
                {...register("type", {
                  required: "This field is required",
                })}
                className="hidden"
              />
              <span className="truncate">{type}</span>
            </label>
          </div>
        ))}
      </div>
      {errors.type && (
        <span className="text-red-500 text-sm font-bold">
          {errors.type.message}
        </span>
      )}
    </div>
  );
}

export default TypeSection;
