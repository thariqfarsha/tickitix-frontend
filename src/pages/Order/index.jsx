import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Seats from "../../components/Seats";
import currency from "../../utils/currency";
import moment from "moment/min/moment-with-locales";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../utils/axios";
import { updateDataBooking } from "../../stores/action/booking";

function Order() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const seatRows = ["A", "B", "C", "D", "E", "F", "G", "-"];
  const leftSeats = [1, 2, 3, 4, 5, 6, 7];
  const rightSeats = [8, 9, 10, 11, 12, 13, 14];
  const [selectedSeat, setSelectedSeat] = useState([]);
  const [reservedSeat, setReservedSeat] = useState([]);

  const dataBooking = useSelector((state) => state.booking.data);

  useEffect(() => {
    getReservedSeat();

    return () => {
      setReservedSeat([]);
    };
  }, []);

  const getReservedSeat = async () => {
    try {
      const result = await axios.get(
        `booking/seat/?scheduleId=${dataBooking.scheduleId}&dateBooking=${dataBooking.dateBooking}&timeBooking=${dataBooking.timeBooking}`
      );
      setReservedSeat(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectSeat = (e) => {
    if (e.target.checked) {
      setSelectedSeat([...selectedSeat, e.target.value]);
    } else {
      const filteredSeat = selectedSeat.filter((el) => el !== e.target.value);
      setSelectedSeat(filteredSeat);
    }
  };

  const handleCheckOut = () => {
    dispatch(
      updateDataBooking({
        seats: selectedSeat,
        totalPayment: dataBooking.price * selectedSeat.length
      })
    );
    navigate("/payment");
    // , {
    //   state: {
    //     ...state,
    //     seats: selectedSeat,
    //     totalPayment: state.price * selectedSeat.length
    //   }
    // });
  };

  return (
    <>
      <Navbar />

      {!dataBooking.scheduleId ? (
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
          <main className="bg-primary-light pb-4">
            <div className="container-lg">
              <div className="row">
                <div className="col-md-8 py-3">
                  <div className="selected-movie-group d-none d-md-block mb-4 mb-md-5">
                    <h2 className="h4 fw-bold mb-3">Movie Selected</h2>
                    <div className="card flex-row px-4 py-3 justify-content-between align-items-center">
                      <p className="h5 mb-0 fw-semibold">{dataBooking.movieName}</p>
                      <button
                        className="btn btn-outline-primary py-1 fs-7 fw-semibold"
                        onClick={() => navigate("/list-movie")}
                      >
                        Change movie
                      </button>
                    </div>
                  </div>
                  <div className="seats-option-group mb-2 mb-md-0">
                    <h2 className="h4 fw-bold mb-3">Choose Your Seat</h2>
                    <div className="card p-4 p-md-5">
                      <div
                        className="bg-primary w-75 rounded-pill mx-auto mb-4"
                        style={{ height: 8 }}
                      ></div>
                      <div className="mb-4 d-flex justify-content-start justify-content-sm-center overflow-auto">
                        <div className="text-center d-none d-md-flex flex-column justify-content-evenly me-4">
                          {seatRows.map((row) => (
                            <span key={row} className="d-block text-secondary fs-7">
                              {row}
                            </span>
                          ))}
                        </div>
                        <Seats
                          seatRows={seatRows}
                          leftSeats={leftSeats}
                          rightSeats={rightSeats}
                          reservedSeat={reservedSeat}
                          handleSelectSeat={handleSelectSeat}
                        />
                      </div>
                      <h5 className="fw-bold mb-3">Seating key</h5>
                      <div className="d-flex d-md-none mb-3">
                        <div className="d-flex align-items-center me-5">
                          <i className="bi bi-arrow-down text-primary me-2"></i>
                          <p className="mb-0">A - G</p>
                        </div>
                        <div className="d-flex align-items-center">
                          <i className="bi bi-arrow-right text-primary me-2"></i>
                          <p className="mb-0">1 - 14</p>
                        </div>
                      </div>
                      <div className="d-flex">
                        <div className="d-flex align-items-center me-3">
                          <div
                            className="border border-secondary me-2"
                            style={{
                              width: 18,
                              height: 18,
                              borderRadius: 4
                            }}
                          ></div>
                          <p className="mb-0">Available</p>
                        </div>
                        <div className="d-flex align-items-center me-3">
                          <div
                            className="bg-primary me-2"
                            style={{ width: 18, height: 18, borderRadius: 4 }}
                          ></div>
                          <p className="mb-0">Selected</p>
                        </div>
                        <div className="d-flex align-items-center me-3">
                          <div
                            className="bg-secondary me-2"
                            style={{ width: 18, height: 18, borderRadius: 4 }}
                          ></div>
                          <p className="mb-0">Sold</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 p-3">
                  <div className="order-info-group">
                    <h2 className="h4 fw-bold mb-3">Order info</h2>
                    <div className="card shadow">
                      <div className="card-header bg-white border-bottom-0 text-center py-3">
                        <img
                          src={require(`../../assets/img/logo/cinema/${dataBooking.premiere}.png`)}
                          alt={dataBooking.premiere}
                          className="img-fluid py-3"
                        />
                        <p className="fs-4 mb-0 fw-semibold">{dataBooking.premiere} Cinema</p>
                      </div>
                      <div className="card-body px-4">
                        <div className="row mb-2">
                          <div className="col">
                            <span className="text-secondary">Movie selected</span>
                          </div>
                          <div className="col text-end">
                            <span className="semi-bold text-end">{dataBooking.movieName}</span>
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col text-nowrap">
                            <span className="text-secondary">Show Date</span>
                          </div>
                          <div className="col text-end">
                            <span className="semi-bold text-end">
                              {moment(dataBooking.dateBooking).locale("id").format("ddd, LL")}
                            </span>
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col text-nowrap">
                            <span className="text-secondary">Show Time</span>
                          </div>
                          <div className="col text-end">
                            <span className="semi-bold text-end">{dataBooking.timeBooking}</span>
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col text-nowrap">
                            <span className="text-secondary">One ticket price</span>
                          </div>
                          <div className="col text-end">
                            <span className="semi-bold text-end">
                              {currency.format(dataBooking.price)}
                            </span>
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
                      <div className="card-footer bg-white py-3 px-4">
                        <div className="row align-items-center">
                          <div className="col text-nowrap">
                            <span className="text-dark fw-semibold">Total Payment</span>
                          </div>
                          <div className="col text-end">
                            <span className="fs-5 fw-bold text-primary text-end">
                              {currency.format(dataBooking.price * selectedSeat.length)}
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
                    Change schedule
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
      )}
    </>
  );
}

export default Order;
