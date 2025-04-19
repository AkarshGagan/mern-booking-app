import React from "react";
import { hotelTypes } from "../config/hote-options-config";

function HotelTypesFilter({ selectedHotelTypes, onChange }) {
  return (
    <div className="border-b border-slate-80 pb-5">
      <h4 className="text-md font-semibold mb-2">Hotel type</h4>
      {hotelTypes.map((hoteltype, index) => (
        <label key={index} className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="rounded"
            value={hoteltype}
            checked={selectedHotelTypes.includes(hoteltype)}
            onChange={onChange}
          />
          <span>{hoteltype}</span>
        </label>
      ))}
    </div>
  );
}

export default HotelTypesFilter;
