import React from "react";

function StarRatingFilter({ selectedStar, onChange }) {
  return (
    <div className="border-b border-slate-80 pb-5">
      <h4 className="text-md font-semibold mb-2">StarRatingFilter</h4>
      {["5", "4", "3", "2", "1"].map((star, index) => (
        <label key={index} className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="rounded"
            value={star}
            checked={selectedStar.includes(star)}
            onChange={onChange}
          />
          <span>{star} Stars</span>
        </label>
      ))}
    </div>
  );
}

export default StarRatingFilter;
