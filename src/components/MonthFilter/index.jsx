import React, { useState } from "react";
import "./index.css";

function MonthFilter(props) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  const upcomingMonths = [
    ...months.slice(props.firstMonth, months.length),
    ...months.slice(0, props.firstMonth)
  ];

  const selectedMonth = months[props.month];

  const handleSetMonth = (month) => {
    const index = months.indexOf(month);
    props.setMonth(index);
  };

  return (
    <div className="month-filter container-lg month-wrapper mb-5">
      {upcomingMonths.map((month) => (
        <span key={month}>
          <button
            className={`btn py-2 my-2 ${
              selectedMonth === month ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => handleSetMonth(month)}
          >
            {month}
          </button>
        </span>
      ))}
    </div>
  );
}

export default MonthFilter;
