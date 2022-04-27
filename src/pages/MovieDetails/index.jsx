import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import ScheduleCard from "../../components/ScheduleCard";

function MovieDetails() {
  const navigate = useNavigate();
  const params = useParams();

  const listSchedule = [
    {
      id: 1,
      premiere: "ebv.id",
      location: "Whatever street No.12, South Purwokerto",
      price: 50000,
      movieName: "Spiderman",
      time: ["08:30am", "12:00pm"]
    },
    {
      id: 2,
      premiere: "cineOne21",
      location: "Whatever street lah ya No.13A, East Purwokerto",
      price: 60000,
      movieName: "Spiderman",
      time: ["02:00pm", "08:30pm"]
    }
  ];

  const [dataOrder, setDataOrder] = useState({
    movieId: params.id,
    dateBooking: new Date().toISOString().split("T")[0]
  });

  const changeDataBooking = (data) => {
    setDataOrder({ ...dataOrder, ...data });
  };

  const handleBooking = () => {
    navigate("/order", { state: dataOrder });
  };

  return (
    <>
      <Navbar />

      <main>
        <section className="movie-details-section bg-white pt-4 pb-5 px-3 px-md-0">
          <div className="container-lg">
            <div className="row">
              <div className="col-md-4 movie-img-side mb-4 mb-md-0 d-flex justify-content-center align-items-start">
                <div className="card p-4">
                  <img
                    src={require("../../assets/img/movie/spiderman.png")}
                    alt="spiderman"
                    className="img-fluid"
                  />
                </div>
              </div>
              <div className="col-md-8 movie-details-side">
                <h1 className="h2 fw-bold text-center text-md-start">Spider-Man: Homecoming</h1>
                <p className="text-secondary text-center text-md-start mb-4">
                  Adventure, Action, Sci-Fi
                </p>
                <div className="row">
                  <div className="details-group col-6 col-md-4 mb-4">
                    <h2 className="fs-7 text-secondary">Release date</h2>
                    <p className="mb-0">June 28, 2017</p>
                  </div>
                  <div className="details-group col-6 col-md-8">
                    <h2 className="fs-7 text-secondary">Directed by</h2>
                    <p className="mb-0">Jon Watts</p>
                  </div>
                  <div className="details-group col-6 col-md-4">
                    <h2 className="fs-7 text-secondary">Duration</h2>
                    <p className="mb-0">2 hours 13 minutes</p>
                  </div>
                  <div className="details-group col-6 col-md-8">
                    <h2 className="fs-7 text-secondary">Casts</h2>
                    <p className="mb-0">Tom Holland, Michael Keaton, Robert Downey Jr., ...</p>
                  </div>
                </div>
                <hr className="my-4" />
                <h2 className="h4 fw-bold mb-3 mb-md-2">Synopsis</h2>
                <p className="text-body">
                  Thrilled by his experience with the Avengers, Peter returns home, where he lives
                  with his Aunt May, under the watchful eye of his new mentor Tony Stark, Peter
                  tries to fall back into his normal daily routine - distracted by thoughts of
                  proving himself to be more than just your friendly neighborhood Spider-Man - but
                  when the Vulture emerges as a new villain, everything that Peter holds most
                  important will be threatened.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="showtimes-section bg-primary-light bg-opacity-10 px-3 px-md-0 py-4 py-sm-5">
          <div className="container-lg">
            <h2 className="h4 fw-bold text-center mb-5">Showtimes and Tickets</h2>
            <div className="row justify-content-center g-3 mb-5">
              <div className="col-md-3">
                <input
                  type="date"
                  id="date"
                  name="date"
                  className="form-control bg-primary-dark"
                  aria-label="date"
                  value={dataOrder.dateBooking}
                  onChange={(e) => changeDataBooking({ dateBooking: e.target.value })}
                />
              </div>
              <div className="col-md-3">
                <select className="form-select bg-primary-dark" aria-label="cinema location">
                  <option defaultValue={""}>Choose location</option>
                  <option value="East Purwokerto">East Purwokerto</option>
                  <option value="South Purwokerto">South Purwokerto</option>
                </select>
              </div>
            </div>
            <div className="schedules-list mb-3">
              <div className="row">
                {listSchedule.map((schedule, index) => (
                  <div className="col-sm-6 col-md-4 mb-4" key={schedule.id}>
                    <ScheduleCard
                      data={schedule}
                      index={index}
                      listSchedule={listSchedule}
                      dataOrder={dataOrder}
                      changeDataBooking={changeDataBooking}
                      handleBooking={handleBooking}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="d-flex justify-content-center view-more">
              <button className="d-block text-sm link color-primary btn btn-link text-in-line">
                view more
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default MovieDetails;
