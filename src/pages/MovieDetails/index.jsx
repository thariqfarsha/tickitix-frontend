import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import ScheduleCard from "../../components/ScheduleCard";
import axios from "../../utils/axios";
import moment from "moment/min/moment-with-locales";
import "./index.css";
import { useDispatch } from "react-redux";
import { createDataBooking } from "../../stores/action/booking";

function MovieDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  const [dataMovie, setDataMovie] = useState({});
  const [listSchedule, setListSchedule] = useState([]);
  const [dataOrder, setDataOrder] = useState({
    movieId: params.id,
    movieName: "",
    price: 0,
    premiere: "",
    scheduleId: null,
    timeBooking: "",
    dateBooking: moment().format("YYYY-MM-DD"),
    paymentMethod: "",
    seats: [],
    totalPayment: 0
  });

  useEffect(() => {
    getDataMovie();
    getListSchedule();
  }, []);

  const getDataMovie = async () => {
    try {
      console.log("get data movie");
      const resultDataMovie = await axios.get(`movie/${params.id}`);
      setDataMovie(resultDataMovie.data.data[0]);
    } catch (error) {
      console.log(error.response);
    }
  };

  const getListSchedule = async () => {
    try {
      console.log("get list movie");
      const resultListSchedule = await axios.get(`schedule?movieId=${params.id}`);
      setListSchedule(resultListSchedule.data.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const changeDataBooking = (data) => {
    setDataOrder({ ...dataOrder, ...data });
  };

  const handleBooking = () => {
    dispatch(createDataBooking(dataOrder));
    navigate("/order");
  };

  console.log(dataOrder);

  return (
    <>
      <Navbar />

      <main>
        <section className="movie-details-section bg-white pt-4 pb-5 px-3 px-md-0">
          <div className="container-lg">
            <div className="row">
              <div className="col-md-4 movie-img-side mb-4 mb-md-0 d-flex justify-content-center align-items-start">
                <div className="card p-4">
                  <img src={dataMovie.imagePath} alt={dataMovie.name} className="img-fluid" />
                </div>
              </div>
              <div className="col-md-8 movie-details-side">
                <h1 className="h2 fw-bold text-center text-md-start">{dataMovie.name}</h1>
                <p className="text-secondary text-center text-md-start mb-4">
                  {dataMovie.category}
                </p>
                <div className="row">
                  <div className="details-group col-6 col-md-4 mb-4">
                    <h2 className="fs-7 text-secondary">Release date</h2>
                    <p className="mb-0">{moment(dataMovie.releaseDate).format("dddd, LL")}</p>
                  </div>
                  <div className="details-group col-6 col-md-8">
                    <h2 className="fs-7 text-secondary">Directed by</h2>
                    <p className="mb-0">{dataMovie.director}</p>
                  </div>
                  <div className="details-group col-6 col-md-4">
                    <h2 className="fs-7 text-secondary">Duration</h2>
                    <p className="mb-0">{dataMovie.duration}</p>
                  </div>
                  <div className="details-group col-6 col-md-8">
                    <h2 className="fs-7 text-secondary">Casts</h2>
                    <p className="mb-0">{dataMovie.cast}</p>
                  </div>
                </div>
                <hr className="my-4" />
                <h2 className="h4 fw-bold mb-3 mb-md-2">Synopsis</h2>
                <p className="text-body">{dataMovie.synopsis}</p>
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
                  onChange={(e) =>
                    changeDataBooking({ dateBooking: moment(e.target.value).format("YYYY-MM-DD") })
                  }
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
                      pathname={location.pathname}
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
