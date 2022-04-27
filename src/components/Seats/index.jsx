import React from "react";
import "./index.css";

function Seats(props) {
  const seatRows = ["A", "B", "C", "D", "E", "F", "G"];
  const leftSeats = [1, 2, 3, 4, 5, 6, 7];
  const rightSeats = [8, 9, 10, 11, 12, 13, 14];

  const reservedSeat = props.reservedSeat;
  const handleSelectSeat = props.handleSelectSeat;

  return (
    <div className="seats mx-auto">
      {seatRows.map((row) => (
        <div className="row" key={row}>
          <div className="col text-center d-none d-md-block">
            <span className="text-secondary fs-7">{row}</span>
          </div>
          <div className="col d-flex justify-content-center">
            {leftSeats.map((seat) => (
              <div className="form-check" key={`${row}${seat}`}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="seat-selection"
                  value={`${row}${seat}`}
                  name="seat-selection"
                  disabled={reservedSeat.includes(`${row}${seat}`) ? true : false}
                  onChange={handleSelectSeat}
                />
                <label className="form-check-label visually-hidden" htmlFor={`${row}${seat}`}>
                  {`${row}${seat}`}
                </label>
              </div>
            ))}
          </div>
          <div className="col"></div>
          <div className="col d-flex justify-content-center">
            {rightSeats.map((seat) => (
              <div className="form-check" key={`${row}${seat}`}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="seat-selection"
                  value={`${row}${seat}`}
                  name="seat-selection"
                  disabled={reservedSeat.includes(`${row}${seat}`) ? true : false}
                  onChange={handleSelectSeat}
                />
                <label className="form-check-label visually-hidden" htmlFor={`${row}${seat}`}>
                  {`${row}${seat}`}
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Seats;
