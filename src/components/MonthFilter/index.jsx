import React from "react";
import "./index.css";

function MonthFilter() {
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
  const month = new Date().getMonth();
  const previous = months.splice(0, month);
  const monthFromNow = [...months, ...previous];

  return (
    <div className="month-filter container-lg month-wrapper mb-5">
      {monthFromNow.map((month, index) => (
        <span key={index}>
          <input
            type="radio"
            className="btn-check"
            name="time"
            id={month.toLowerCase()}
            autoComplete="off"
          />
          <label className="btn btn-outline-primary py-2" htmlFor={month.toLowerCase()}>
            {month}
          </label>
        </span>
      ))}
    </div>
  );
}

export default MonthFilter;
