import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import axios from "../../utils/axios";
import moment from "moment/min/moment-with-locales";
import currency from "../../utils/currency";
import { useSelector } from "react-redux";

function Payment() {
  const navigate = useNavigate();
  const location = useLocation();

  const dataUser = useSelector((state) => state.user.data);
  const dataBooking = useSelector((state) => state.booking.data);

  const formBooking = {
    scheduleId: dataBooking.scheduleId,
    dateBooking: dataBooking.dateBooking,
    timeBooking: dataBooking.timeBooking,
    paymentMethod: "",
    seats: dataBooking.seats,
    totalPayment: dataBooking.totalPayment
  };

  useEffect(() => {
    if (location.search === "?status=success") {
      window.location.href = "http://localhost:3000/booking/id/34";
    }
  }, []);

  const handlePayment = async () => {
    try {
      const result = await axios.post("booking", formBooking);
      console.log(result);
      window.location.href = result.data.data.redirectUrl;
      // const resultPayment = await axios.post("booking", JSON.stringify(dataPayment));
      // console.log(JSON.stringify(dataPayment));
      // console.log(resultPayment);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      {Object.keys(dataBooking).length === 0 || dataBooking.totalPayment === 0 ? (
        <main className="bg-primary-light pb-4 vh-100 d-flex justify-content-center align-items-center">
          <div className="text-center">
            <h1 className="h2 fw-semibold mb-4">You have no movie selected yet</h1>
            <Link to={"/list-movie"} className="btn btn-primary fw-semibold">
              View all movies
            </Link>
          </div>
        </main>
      ) : (
        <>
          <main className="bg-primary bg-opacity-10 pb-4">
            <div className="container-lg">
              <div className="row">
                <div className="col-md-7 p-3">
                  <div className="payment-info-group mb-0 mb-md-4">
                    <h2 className="h4 fw-bold mb-3">Payment Info</h2>
                    <div className="card p-2 p-md-3">
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item py-3 d-block d-md-flex justify-content-between align-items-center">
                          <span className="d-block text-secondary">Date & time</span>
                          <span className="d-block text-md-end fw-semibold">
                            {moment(dataBooking.dateBooking).locale("id").format("ddd, LL")} at{" "}
                            {dataBooking.timeBooking}
                          </span>
                        </li>
                        <li className="list-group-item py-3 d-block d-md-flex justify-content-between align-items-center">
                          <span className="d-block text-secondary">Movie title</span>
                          <span className="d-block text-md-end fw-semibold">
                            {dataBooking.movieName}
                          </span>
                        </li>
                        <li className="list-group-item py-3 d-block d-md-flex justify-content-between align-items-center">
                          <span className="d-block text-secondary">Cinema</span>
                          <span className="d-block text-md-end fw-semibold">
                            {dataBooking.premiere}
                          </span>
                        </li>
                        <li className="list-group-item py-3 d-block d-md-flex justify-content-between align-items-center">
                          <span className="d-block text-secondary">Number of tickets</span>
                          <span className="d-block text-md-end fw-semibold">
                            {dataBooking.seats.length} pieces
                          </span>
                        </li>
                        <li className="list-group-item py-3 d-block d-md-flex justify-content-between align-items-center">
                          <span className="d-block text-secondary">Total Payment</span>
                          <span className="d-block text-md-end fw-semibold">
                            {currency.format(dataBooking.totalPayment)}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="d-none d-md-flex justify-content-between align-items-center">
                    <button
                      className="btn btn-outline-primary py-2 shadow-sm d-none d-md-block"
                      onClick={() => navigate(-1)}
                    >
                      Change Seats
                    </button>
                    <button
                      className="checkout-btn btn btn-primary py-2 fw-bold shadow"
                      onClick={() => handlePayment({ ...dataBooking })}
                    >
                      Proceed to Pay
                    </button>
                  </div>
                </div>
                <div className="col-md-5 p-3">
                  <div className="personal-info-group mb-3">
                    <h2 className="h4 fw-bold mb-3">Personal info</h2>
                    <div className="card p-4">
                      <div className="mb-3">
                        <label htmlFor="full-name" className="form-label">
                          Full Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="full-name"
                          placeholder="Full name"
                          value={dataUser.firstName + " " + dataUser.lastName}
                          disabled={dataUser ? true : false}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                          Email
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          placeholder="email@example.com"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone-number" className="form-label">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          minLength="11"
                          maxLength="13"
                          className="form-control"
                          id="phone-number"
                          placeholder="08XXXXXXXXXX"
                          value={dataUser.noTelp}
                          disabled={dataUser ? true : false}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-7 px-3 pb-3 d-md-none d-grid">
                  <button
                    className="checkout-btn btn btn-primary py-2 fw-bold shadow"
                    onClick={handlePayment}
                  >
                    Proceed to Pay
                  </button>
                </div>
              </div>
              <div className="row"></div>
            </div>
          </main>

          <Footer />
        </>
      )}
    </>
  );
}

export default Payment;
