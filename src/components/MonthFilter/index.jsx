import React, { useState } from "react";
import "./index.css";

function MonthFilter() {
  const months = [
    { number: 1, monthName: "January" },
    { number: 2, monthName: "February" },
    { number: 3, monthName: "March" },
    { number: 4, monthName: "April" },
    { number: 5, monthName: "May" },
    { number: 6, monthName: "June" },
    { number: 7, monthName: "July" },
    { number: 8, monthName: "August" },
    { number: 9, monthName: "September" },
    { number: 10, monthName: "October" },
    { number: 11, monthName: "November" },
    { number: 12, monthName: "December" }
  ];

  const month = new Date().getMonth() + 1;
  const previous = months.splice(0, month);
  const monthFromNow = [...months, ...previous];

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  return (
    <div className="month-filter container-lg month-wrapper mb-5">
      {monthFromNow.map((month) => (
        <span key={month.number}>
          <button
            className={`btn py-2 my-2 ${
              selectedMonth === month.number ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => setSelectedMonth(month.number)}
          >
            {month.monthName}
          </button>
        </span>
      ))}
    </div>
  );
}

export default MonthFilter;
