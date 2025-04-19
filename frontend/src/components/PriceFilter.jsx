function PriceFilter({ selectedPrice, onChange }) {
  return (
    <div>
      <h4 className="text-xl font-semibold mb-2">Max Price</h4>
      <select
        className="bg-slate-800 p-2 border rounded-md w-full"
        name=""
        id=""
        value={selectedPrice}
        onChange={(e) =>
          onChange(e.target.value ? parseInt(e.target.value) : undefined)
        }
      >
        <option value="">Select max price</option>
        {[50, 100, 200, 300, 500, 600].map((price, index) => (
          <option value={price} key={index}>
            {price}
          </option>
        ))}
      </select>
    </div>
  );
}

export default PriceFilter;
