import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Seats from "../../components/Seats";
import "./index.css";

function Order() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [selectedSeat, setSelectedSeat] = useState([]);
  const [reservedSeat, setReservedSeat] = useState(["A1", "B5", "C2", "C3"]);

  const handleSelectSeat = (e) => {
    if (e.target.checked) {
      setSelectedSeat([...selectedSeat, e.target.value]);
    } else {
      const filteredSeat = selectedSeat.filter((el) => el !== e.target.value);
      setSelectedSeat(filteredSeat);
    }
  };

  const handleCheckOut = () => {
    navigate("/payment", {
      state: {
        ...state,
        seatBooking: selectedSeat,
        totalPayment: state.price * selectedSeat.length
      }
    });
  };

  return (
    <>
      <Navbar />

      <main className="bg-primary-light pb-4">
        <div className="container-lg">
          <div className="row">
            <div className="col-md-8 py-3">
              <div className="selected-movie-group d-none d-md-block mb-4 mb-md-5">
                <h2 className="h4 fw-bold mb-3">Movie Selected</h2>
                <div className="card flex-row px-4 py-3 justify-content-between align-items-center">
                  <p className="h5 mb-0 fw-semibold">{state.movieName}</p>
                  <button
                    className="btn btn-outline-primary py-1 fs-7 fw-semibold"
                    onClick={() => navigate(-1)}
                  >
                    Change movie
                  </button>
                </div>
              </div>
              <div className="seats-option-group mb-2 mb-md-0">
                <h2 className="h4 fw-bold mb-3">Choose Your Seat</h2>
                <div className="card p-5">
                  <Seats
                    selectedSeat={[selectedSeat, setSelectedSeat]}
                    reservedSeat={reservedSeat}
                    handleSelectSeat={handleSelectSeat}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-4 p-3">
              <div className="order-info-group">
                <h2 className="h4 fw-bold mb-3">Order info</h2>
                <div className="card shadow">
                  <div className="card-header bg-white border-bottom-0 text-center py-3">
                    <img
                      src={require(`../../assets/img/logo/cinema/${state.premiere}.png`)}
                      alt={state.premiere}
                      className="img-fluid py-3"
                    />
                    <p className="fs-4 mb-0 fw-semibold">{state.premiere} Cinema</p>
                  </div>
                  <div className="card-body">
                    <div className="row mb-2">
                      <div className="col">
                        <span className="text-secondary">Movie selected</span>
                      </div>
                      <div className="col text-end">
                        <span className="semi-bold text-end">{state.movieName}</span>
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="col text-nowrap">
                        <span className="text-secondary">Show Date</span>
                      </div>
                      <div className="col text-end">
                        <span className="semi-bold text-end">{state.dateBooking}</span>
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="col text-nowrap">
                        <span className="text-secondary">Show Time</span>
                      </div>
                      <div className="col text-end">
                        <span className="semi-bold text-end">{state.timeBooking}</span>
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="col text-nowrap">
                        <span className="text-secondary">One ticket price</span>
                      </div>
                      <div className="col text-end">
                        <span className="semi-bold text-end">Rp {state.price}</span>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col text-nowrap">
                        <span className="text-secondary">Seat chosen</span>
                      </div>
                      <div className="col text-end">
                        <span className="semi-bold text-end">{selectedSeat.join(", ")}</span>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer bg-white py-3">
                    <div className="row align-items-center">
                      <div className="col text-nowrap">
                        <span className="text-dark fw-semibold">Total Payment</span>
                      </div>
                      <div className="col text-end">
                        <span className="fs-5 fw-bold text-primary text-end">
                          Rp {state.price * selectedSeat.length}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mb-3 mb-md-0">
            <div className="col-md-8 p-3 d-flex justify-content-between align-items-center">
              <button
                className="btn btn-outline-primary shadow-sm d-none d-md-block py-2"
                onClick={() => navigate(-1)}
              >
                Change movie
              </button>
              <button
                className="checkout-btn btn btn-primary fw-bold shadow py-2"
                onClick={handleCheckOut}
              >
                Checkout now
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Order;
