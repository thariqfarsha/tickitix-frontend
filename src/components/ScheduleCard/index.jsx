import React, { useState } from "react";
import "./index.css";

function ScheduleCard(props) {
  const [selectedTime, setSelectedTime] = useState("");
  const { id: scheduleId, premiere, location, price, time: timeBooking } = props.data;
  const index = props.index;
  const listSchedule = props.listSchedule;
  const pathname = props.pathname;
  const showTimes = ["08:30am", "10:30am", "12:00pm", "02:00pm", "04:30pm", "07:00pm", "08:30pm"];

  const textTruncate = (str, length = 45, ending = "...") => {
    return str.length > length ? str.substring(0, length - ending.length) + ending : str;
  };

  return (
    <div className="card schedule-card shadow-sm">
      <div className="card-header bg-white py-4">
        <div className="row">
          <div className="col-6 d-flex justify-content-center align-items-center">
            <img
              src={require(`../../assets/img/logo/cinema/${premiere}.png`)}
              alt={`${premiere}`}
              className="img-fluid"
            />
          </div>
          <div className="col-6">
            <h3 className="h4 fw-semibold">{premiere}</h3>
            <p className="fs-7 text-secondary mb-0">{textTruncate(location)}</p>
          </div>
        </div>
      </div>
      <div className="card-body p-4">
        <div className="row gy-3">
          {showTimes.map((time) => (
            <div className="col-3 text-center" key={time}>
              {pathname === "/manage-schedule" ? (
                <button
                  className="schedule-card__time bg-transparent fs-7 fw-semibold border-0"
                  disabled={timeBooking.includes(time) ? false : true}
                >
                  {time}
                </button>
              ) : (
                <button
                  className={`schedule-card__time bg-transparent fs-7 fw-semibold border-0 ${
                    selectedTime === time ? "text-primary fw-bold" : ""
                  }`}
                  disabled={timeBooking.includes(time) ? false : true}
                  onClick={() => {
                    props.changeDataBooking({
                      timeBooking: time,
                      scheduleId: scheduleId,
                      movieName: listSchedule[index].name,
                      price: listSchedule[index].price,
                      premiere: listSchedule[index].premiere
                    });
                    setSelectedTime(time);
                  }}
                >
                  {time}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="card-footer bg-white border-0 px-4 pt-2 pb-4">
        <div className="d-flex justify-content-between mb-3">
          <p className="text-secondary">Price</p>
          <p className="fw-semibold">Rp {price} /seat</p>
        </div>
        {props.pathname === "/manage-schedule" ? (
          <div>
            <button
              className="btn btn-outline-primary py-2 w-100 mb-3"
              onClick={() => props.setUpdate(props.data)}
            >
              Update
            </button>
            <button
              className="btn btn-outline-danger py-2 w-100"
              onClick={() => props.handleDelete(props.data.scheduleId)}
            >
              Delete
            </button>
          </div>
        ) : (
          <button
            className="btn btn-primary shadow py-2 w-100"
            disabled={scheduleId === props.dataOrder.scheduleId ? false : true}
            onClick={props.handleBooking}
          >
            Book now
          </button>
        )}
      </div>
    </div>
  );
}

export default ScheduleCard;
