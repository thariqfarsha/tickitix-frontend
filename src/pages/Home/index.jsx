import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Card from "../../components/Card";
import Footer from "../../components/Footer";
import MonthFilter from "../../components/MonthFilter";
import Navbar from "../../components/Navbar";
import { getDataMovieRedux } from "../../stores/action/movie";
import axios from "../../utils/axios";
import "./index.css";

function Home() {
  document.title = "Tickitix | Home";

  const dispatch = useDispatch();

  const limit = 6;
  const page = 1;
  const search = "";
  const sort = "createdAt desc";
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [dataNowShowingMovie, setDataNowShowingMovie] = useState([]);
  const upcomingMovie = useSelector((state) => state.movie.data);

  useEffect(() => {
    getNowShowingMovie();
    getUpcomingMovie();
  }, []);

  useEffect(() => {
    getUpcomingMovie();
  }, [month]);

  const getUpcomingMovie = async () => {
    try {
      dispatch(getDataMovieRedux(page, limit, search, sort, month));
    } catch (error) {
      console.log(error.response);
    }
  };

  const getNowShowingMovie = async () => {
    try {
      const resultNowShowingMovie = await axios.get(
        `movie?page=${page}&limit=${limit}&searchRelease=${new Date().getMonth() + 1}`
      );
      setDataNowShowingMovie(resultNowShowingMovie.data.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <>
      <header>
        <Navbar />
      </header>

      <main>
        <section className="hero-section container-fluid px-3 px-lg-0 py-2 py-md-5 bg-white">
          <div className="container-lg">
            <div className="row">
              <div className="col-md d-flex flex-column justify-content-center mb-5 mb-sm-0">
                <span className="h4 fw-normal text-placeholder">Nearest Cinema, Newest Movie,</span>
                <h1 className="display-3 fw-bold text-primary">Find out now!</h1>
              </div>
              <div className="col-md d-flex justify-content-center">
                <img
                  src={require("../../assets/img/hero-img.png")}
                  alt="hero"
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="now-showing-section container-fluid bg-primary bg-opacity-10 px-3 px-lg-0 pt-4 pb-5 py-sm-5">
          <div className="container-lg d-flex justify-content-between align-items-center mb-4">
            <h2 className="h2 fw-bold text-primary">Now Showing</h2>
            <Link
              to="/list-movie"
              state={{ month: new Date().getMonth() }}
              className="d-block fw-bold link-primary text-decoration-none"
            >
              view all
            </Link>
          </div>
          <div className="container-lg movie-card-wrapper d-flex">
            {dataNowShowingMovie &&
              dataNowShowingMovie.map((movie) => (
                <div key={movie.id}>
                  <Card data={movie} />
                </div>
              ))}
          </div>
        </section>

        <section className="container-fluid bg-white px-3 px-lg-0 pt-4 py-sm-5">
          <div className="container-lg d-flex justify-content-between align-items-center mb-4">
            <h2 className="h2 fw-bold text-dark">Upcoming Movies</h2>
            <Link
              to="/list-movie"
              state={{ month: new Date().getMonth() + 1 }}
              className="d-block fw-bold link-primary text-decoration-none"
            >
              view all
            </Link>
          </div>
          <MonthFilter month={month} setMonth={setMonth} firstMonth={new Date().getMonth() + 1} />
          <div className="container-lg movie-card-wrapper d-flex">
            {upcomingMovie &&
              upcomingMovie.map((movie) => (
                <div key={movie.id}>
                  <Card data={movie} />
                </div>
              ))}
          </div>
        </section>

        <section className="container-fluid bg-white py-5">
          <div className="container shadow-lg p-5 mb-5 bg-body rounded">
            <h2 className="h3 text-secondary text-center mb-5">
              Be the vanguard of the
              <br />
              <span className="display-5 fw-bold text-primary">Moviegoers</span>
            </h2>
            <form className="text-center mb-5">
              <div className="row justify-content-center gx-2 gy-2">
                <div className="col-md-5 col-lg-4">
                  <label htmlFor="email" className="visually-hidden">
                    Email
                  </label>
                  <input type="email" className="form-control" placeholder="Type your email" />
                </div>
                <div className="col-md-3 col-lg-2 justify-content-start">
                  <button type="submit" className="btn btn-primary w-100">
                    Join now
                  </button>
                </div>
              </div>
            </form>
            <p className="text-secondary text-center">
              By joining you as a Tickitz member,
              <br />
              we will always send you the latest updates via email
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Home;
