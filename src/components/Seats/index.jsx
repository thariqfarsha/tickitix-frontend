import React from "react";
import "./index.css";

function Seats(props) {
  const { leftSeats, rightSeats, reservedSeat, handleSelectSeat } = props;
  // const leftSeats = [1, 2, 3, 4, 5, 6, 7];
  // const rightSeats = [8, 9, 10, 11, 12, 13, 14];

  // const reservedSeat = props.reservedSeat;
  // const handleSelectSeat = props.handleSelectSeat;

  return (
    <div className="seats">
      {props.seatRows.map((row) => (
        <div className="row flex-nowrap" key={row}>
          <div className="col d-flex justify-content-center">
            {leftSeats.map((seat) =>
              row === "-" ? (
                <div key={seat} className="form-check px-2 py-1 d-none d-md-flex">
                  <div
                    className="text-secondary text-center fs-7"
                    style={{ width: 16, height: 16 }}
                  >
                    {seat}
                  </div>
                </div>
              ) : (
                <div className="form-check px-2 py-1" key={`${row}${seat}`}>
                  <input
                    className="form-check-input m-0"
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
              )
            )}
          </div>
          <div className="col"></div>
          <div className="col d-flex justify-content-center">
            {rightSeats.map((seat) =>
              row === "-" ? (
                <div
                  key={seat}
                  className="form-check py-1 d-none d-md-flex"
                  style={{
                    paddingInline: Boolean(seat) && seat.toString().length > 1 ? 8 : 10
                  }}
                >
                  <div
                    className="text-secondary text-center fs-7"
                    style={{ width: 18, height: 16 }}
                  >
                    {seat}
                  </div>
                </div>
              ) : (
                <div className="form-check px-2 py-1" key={`${row}${seat}`}>
                  <input
                    className="form-check-input m-0"
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
              )
            )}
          </div>
        </div>
      ))}
      {/* <div className="row">
        {leftSeats.map((seat) => (
          <div className="col">
            <span className="text-secondary fs-7">{seat}</span>
          </div>
        ))}
        <div className="col"></div>
        {rightSeats.map((seat) => (
          <div className="col">
            <span className="text-secondary fs-7">{seat}</span>
          </div>
        ))}
      </div> */}
    </div>
  );
}

export default Seats;
