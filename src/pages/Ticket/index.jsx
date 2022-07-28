import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { QRCodeSVG } from "qrcode.react";
import axios from "../../utils/axios";
import { useParams } from "react-router-dom";
import moment from "moment/min/moment-with-locales";
import currency from "../../utils/currency";

export default function Ticket() {
  const params = useParams();

  const [dataBooking, setDataBooking] = useState({});

  const bookingDetails = [
    { label: "Date", value: moment(dataBooking.dateBooking).locale("id").format("ddd, LL") },
    { label: "Time", value: dataBooking.timeBooking },
    { label: "Category", value: dataBooking.category },
    { label: "Count", value: `${dataBooking.totalTicket} pcs` },
    { label: "Seats", value: Object.keys(dataBooking).length !== 0 && dataBooking.seat.join(", ") },
    { label: "Price", value: currency.format(dataBooking.totalPayment) }
  ];

  useEffect(() => {
    getBookingById();
  }, []);

  const getBookingById = async () => {
    try {
      const result = await axios.get(`booking/id/${params.id}`);
      setDataBooking(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <main className="bg-primary bg-opacity-10 pb-4">
        <div className="container-lg">
          <div className="bg-white rounded p-3 p-md-5 my-4">
            <div className="container">
              <div className="row mx-0 mx-md-3 border" style={{ borderRadius: 16 }}>
                <div className="col-md-8 order-2 order-md-1 p-0 position-relative">
                  <div
                    className="d-none d-md-block bg-primary px-5 py-4 border-end"
                    style={{ borderTopLeftRadius: 16 }}
                  >
                    <img
                      src={require("../../assets/img/logo/logo-white-md.png")}
                      alt="tickitix logo"
                      height={28}
                    />
                  </div>
                  <div
                    className="container bg-white px-4 px-md-5 py-4 border-end border-top"
                    style={{ borderBottomLeftRadius: 16 }}
                  >
                    <div className="row">
                      <div className="col-12">
                        <p className="text-secondary fs-7 mb-2">Movie</p>
                        <p className="fw-semibold mb-4">{dataBooking.name}</p>
                      </div>
                      {bookingDetails.map((detail, index) => (
                        <div className="col-6 col-md-4" key={index}>
                          <p className="text-secondary fs-7 mb-2">{detail.label}</p>
                          <p className="fw-semibold mb-4">{detail.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* <div
                    className="bg-white border border-white position-absolute top-0 start-100 translate-middle-x"
                    style={{
                      width: 48,
                      height: 24,
                      borderBottomLeftRadius: 24,
                      borderBottomRightRadius: 24
                    }}
                  ></div>
                  <div
                    className="bg-white border border-white position-absolute bottom-0 start-100 translate-middle-x"
                    style={{
                      width: 48,
                      height: 24,
                      borderTopLeftRadius: 24,
                      borderTopRightRadius: 24
                    }}
                  ></div> */}
                </div>
                <div className="col-md-4 order-1 order-md-2 p-0 d-flex flex-column">
                  <div
                    className="d-none d-md-block bg-primary px-4 px-md-5 py-2 py-md-4 text-center"
                    style={{ borderTopRightRadius: 16 }}
                  >
                    <img
                      src={require("../../assets/img/logo/logo-white-md.png")}
                      alt="tickitix logo"
                      height={28}
                    />
                  </div>
                  <div
                    className="d-block d-md-none bg-primary px-4 px-md-5 py-2 py-md-4 text-center"
                    style={{ borderTopRightRadius: 16, borderTopLeftRadius: 16 }}
                  >
                    <img
                      src={require("../../assets/img/logo/logo-white-md.png")}
                      alt="tickitix logo"
                      height={24}
                    />
                  </div>
                  <div className="h-100 p-5 d-flex justify-content-center align-items-center">
                    {new Date().getTime() >
                    new Date(
                      dataBooking.dateBooking &&
                        dataBooking.dateBooking.split("T")[0] + "T" + dataBooking.timeBooking + "Z"
                    ).getTime() ? (
                      <div
                        className="d-flex justify-content-center align-items-center"
                        style={{
                          width: 160,
                          height: 160,
                          backgroundColor: "var(--bs-gray-200)"
                        }}
                      >
                        <p className="h6 fw-bold text-center">Ticket is expired</p>
                      </div>
                    ) : dataBooking.statusUsed === "active" ? (
                      <QRCodeSVG value={`booking/ticket/${params.id}`} size={160} />
                    ) : (
                      <div
                        className="d-flex justify-content-center align-items-center"
                        style={{
                          width: 160,
                          height: 160,
                          backgroundColor: "var(--bs-gray-200)"
                        }}
                      >
                        <p className="h6 fw-bold text-center">Ticket is already used</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
