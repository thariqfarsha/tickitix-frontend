import React, { useEffect, useState } from "react";
import moment from "moment/min/moment-with-locales";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";

export default function BookingCard(props) {
  const navigate = useNavigate();

  const { id, dateBooking, timeBooking, name, statusUsed, scheduleId } = props.booking;

  const [premiere, setPremiere] = useState("");

  useEffect(() => {
    getPremiere();

    return () => {
      setPremiere("");
    };
  }, []);

  const getPremiere = async () => {
    try {
      const result = await axios.get(`schedule/${scheduleId}`);
      setPremiere(result.data.data[0].premiere);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card border-0 mb-3">
      <div className="card-body p-4">
        <div className="row">
          <div className="col-md-8 order-2 order-md-1">
            <p className="text-secondary fs-7 mb-2">{`${moment(dateBooking)
              .locale("id")
              .format("ddd, LL")} - ${timeBooking}`}</p>
            <h5 className="fw-bold mb-0">{name}</h5>
          </div>
          <div className="col-md-4 d-flex justify-content-start justify-content-md-end align-items-center order-1 order-md-2 mb-3 mb-md-0">
            <img
              src={premiere && require(`../../assets/img/logo/cinema/${premiere}.png`)}
              alt="cinema logo"
              height={premiere === "cineOne21" ? 20 : 28}
            />
          </div>
        </div>
      </div>
      <div className="card-footer bg-white px-4 py-3 d-grid d-md-flex align-items-center">
        <button
          className={`btn ${
            statusUsed === "active" &&
            new Date().getTime() <
              new Date(dateBooking && dateBooking.split("T")[0] + "T" + timeBooking + "Z").getTime()
              ? "btn-success"
              : "btn-secondary"
          } py-2 px-4 text-white fw-semibold`}
          onClick={() => navigate(`/booking/id/${id}`)}
        >
          {new Date().getTime() >
          new Date(dateBooking && dateBooking.split("T")[0] + "T" + timeBooking + "Z").getTime()
            ? "Ticket is expired"
            : statusUsed === "active"
            ? "Ticket is active"
            : "Ticket is already used"}
        </button>
      </div>
    </div>
  );
}
