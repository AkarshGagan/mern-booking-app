import { hotelFacilities } from "../config/hote-options-config";

function FacilitiesFilter({ selectedHotelFacility, onChange }) {
  return (
    <div className="border-b border-slate-80 pb-5">
      <h4 className="text-md font-semibold mb-2">Hotel type</h4>
      {hotelFacilities.map((hotelfacility, index) => (
        <label key={index} className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="rounded"
            value={hotelfacility}
            checked={selectedHotelFacility.includes(hotelfacility)}
            onChange={onChange}
          />
          <span>{hotelfacility}</span>
        </label>
      ))}
    </div>
  );
}

export default FacilitiesFilter;
