import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import axios from "../../utils/axios";

function Payment() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const dataUser = JSON.parse(localStorage.getItem("dataUser"));
  console.log(state);
  const handlePayment = async (dataPayment) => {
    const resultPayment = await axios.post("booking", JSON.stringify(dataPayment));
    console.log(JSON.stringify(dataPayment));
    console.log(resultPayment);
  };

  return (
    <>
      <Navbar />

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
                        {state.dateBooking} at {state.timeBooking}
                      </span>
                    </li>
                    <li className="list-group-item py-3 d-block d-md-flex justify-content-between align-items-center">
                      <span className="d-block text-secondary">Movie title</span>
                      <span className="d-block text-md-end fw-semibold">{state.movieName}</span>
                    </li>
                    <li className="list-group-item py-3 d-block d-md-flex justify-content-between align-items-center">
                      <span className="d-block text-secondary">Cinema</span>
                      <span className="d-block text-md-end fw-semibold">{state.premiere}</span>
                    </li>
                    <li className="list-group-item py-3 d-block d-md-flex justify-content-between align-items-center">
                      <span className="d-block text-secondary">Number of tickets</span>
                      <span className="d-block text-md-end fw-semibold">
                        {state.seats.length} pieces
                      </span>
                    </li>
                    <li className="list-group-item py-3 d-block d-md-flex justify-content-between align-items-center">
                      <span className="d-block text-secondary">Total Payment</span>
                      <span className="d-block text-md-end fw-semibold">
                        Rp {state.totalPayment}
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
                  onClick={() => handlePayment({ ...state })}
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
                  {/* <div className="alert alert-warning mt-4 mb-0" role="alert">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>Fill your data
                    correctly!
                  </div> */}
                </div>
              </div>
            </div>
            <div className="col-md-7 px-3 pb-3 d-md-none d-grid">
              <button
                className="checkout-btn btn btn-primary py-2 fw-bold shadow"
                onClick={() => handlePayment({ ...state })}
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
  );
}

export default Payment;
