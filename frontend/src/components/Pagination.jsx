import React from "react";

function Pagination({ page, pages, onPageChange }) {
  const pageNumbers = [];
  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="flex justify-center">
      <ul className="flex border border-slate-700">
        {pageNumbers.map((number, index) => {
          return (
            <li
              key={index}
              className={`px-2 py-1 ${
                page === number ? "bg-blue-600 text-white" : ""
              }`}
            >
              <button onClick={() => onPageChange(number)}>{number} </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Pagination;
