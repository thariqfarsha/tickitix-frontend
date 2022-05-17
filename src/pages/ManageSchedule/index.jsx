import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Card from "../../components/Card";
import ReactPaginate from "react-paginate";
import { useSelector, useDispatch } from "react-redux";
import { getDataMovieRedux } from "../../stores/action/movie";
import {
  getDataScheduleRedux,
  postScheduleRedux,
  updateScheduleRedux,
  deleteScheduleRedux
} from "../../stores/action/schedule";
import ScheduleCard from "../../components/ScheduleCard";
import { useLocation } from "react-router-dom";

function ManageSchedule() {
  const location = useLocation();
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movie);
  const schedules = useSelector((state) => state.schedule);

  const [page, setPage] = useState(1);
  const limit = 6;
  const [preview, setPreview] = useState(null);
  const [premiere, setPremiere] = useState("");
  const [showInputTime, setShowInputTime] = useState(false);
  const [form, setForm] = useState({
    movieId: null,
    premiere: "",
    price: null,
    location: "",
    dateStart: "",
    dateEnd: "",
    time: []
  });
  const premiereList = ["ebv.id", "hiflix", "cineOne21"];

  useEffect(() => {
    getAllMovie();
  }, []);

  useEffect(() => {
    getScheduleByMovieId();
  }, [form.movieId]);

  const getAllMovie = async () => {
    try {
      await dispatch(getDataMovieRedux(1, 100));
    } catch (error) {
      console.log(error.response);
    }
  };

  const getScheduleByMovieId = async () => {
    try {
      await dispatch(getDataScheduleRedux(form.movieId, page, limit));
    } catch (error) {
      console.log(error.response);
    }
  };

  const handlePagination = (e) => {
    setPage(e.selected + 1);
  };

  const handleChangeForm = (e) => {
    if (e.target.name === "movie-list") {
      const dataMovie = movies.data.find((item) => {
        return +item.id === +e.target.value;
      });
      setPreview(dataMovie ? dataMovie.imagePath : null);
      setForm({ ...form, movieId: e.target.value });
    }
  };

  const addTime = (e) => {
    if (e.key === "Enter") {
      setShowInputTime(false);
      if (e.target.value === "") {
        return;
      }
      setForm({
        ...form,
        time: [...form.time, e.target.value]
      });
    }
  };

  const handleSubmit = () => {
    return;
  };

  const resetForm = () => {
    setForm({
      movieId: null,
      premiere: "",
      price: null,
      location: "",
      dateStart: "",
      dateEnd: "",
      time: []
    });
  };

  return (
    <>
      <Navbar />

      <main className="bg-primary-light pb-4">
        <section className="form-movie container-lg mt-4 mb-5">
          <h2 className="h4 fw-bold mb-3">Form Schedule</h2>
          <div className="card border-0 p-5">
            <form onSubmit={handleSubmit} onReset={resetForm}>
              <div className="row gx-5 mb-4">
                <div className="col-3">
                  <div className="card p-4">
                    <img
                      src={!preview ? "https://via.placeholder.com/200x300.png?text=+" : preview}
                      alt="movie image preview"
                    />
                  </div>
                </div>
                <div className="col-9">
                  <div className="row">
                    <div className="col-6">
                      <div className="mb-4">
                        <label htmlFor="movie-list" className="form-label">
                          Movie Name
                        </label>
                        <select
                          className="form-select"
                          id="movie-list"
                          name="movie-list"
                          onChange={handleChangeForm}
                        >
                          <option defaultValue={""}>Select movie</option>
                          {movies.data.map((movie) => (
                            <option value={movie.id} key={movie.id}>
                              {movie.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="mb-4">
                        <label htmlFor="price" className="form-label">
                          Price
                        </label>
                        <input type="text" className="form-control" id="price" />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="premiere" className="form-label">
                          Premiere
                        </label>
                        <div className="row" id="premiere">
                          {premiereList.map((el) => (
                            <div className="col-4 d-flex align-items-center" key={el}>
                              <button
                                className={`btn ${el === premiere ? "shadow" : ""}`}
                                value={el}
                                onClick={() => setPremiere(el)}
                                type="button"
                              >
                                <img
                                  src={require(`../../assets/img/logo/cinema/${el}.png`)}
                                  className="img-fluid"
                                  alt={el}
                                />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="mb-4">
                        <label htmlFor="location" className="form-label">
                          Location
                        </label>
                        <select className="form-select" id="location">
                          <option defaultValue={""}>Select location</option>
                          <option value="East Purwokerto">East Purwokerto</option>
                          <option value="West Purwokerto">West Purwokerto</option>
                        </select>
                      </div>
                      <div className="row mb-4">
                        <div className="col-6">
                          <label htmlFor="date-start" className="form-label">
                            Date Start
                          </label>
                          <input type="date" className="form-control" id="date-start" />
                        </div>
                        <div className="col-6">
                          <label htmlFor="date-end" className="form-label">
                            Date End
                          </label>
                          <input type="date" className="form-control" id="date-end" />
                        </div>
                      </div>
                      <div className="mb-4">
                        <label htmlFor="location" className="form-label">
                          Time
                        </label>
                        <div className="row row-cols-md-3 row-cols-lg-4 gy-3">
                          <div className="col">
                            {showInputTime ? (
                              <input
                                type="text"
                                className="form-control py-1 w-100"
                                onKeyPress={addTime}
                                autoFocus={true}
                              />
                            ) : (
                              <button
                                className="btn btn-outline-primary w-100 py-1"
                                onClick={() => setShowInputTime(true)}
                              >
                                <i className="bi bi-plus-lg"></i>
                              </button>
                            )}
                          </div>
                          {form.time.map((el) => (
                            <div className="col">
                              <button className="btn text-nowrap w-100 py-1">{el}</button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row buttons justify-content-end">
                <div className="col-2">
                  <button type="reset" className="btn btn-outline-primary w-100">
                    Reset
                  </button>
                </div>
                <div className="col-2">
                  <button type="submit" className="btn btn-primary fw-semibold w-100">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>

        <section className="data-movie">
          <div className="container-lg my-4">
            <div className="row">
              <div className="col-2 d-flex align-items-center">
                <h2 className="h4 fw-bold mb-3">Date Schedule</h2>
              </div>
              <div className="col-4"></div>
              <div className="col-1">
                <select className="form-select py-2" aria-label="movie sort method">
                  <option defaultValue={""}>Sort</option>
                  <option value="name asc">A - Z</option>
                  <option value="name desc">Z - A</option>
                </select>
              </div>
              <div className="col-2">
                <select className="form-select py-2" aria-label="location">
                  <option defaultValue={""}>Select location</option>
                  <option value="East Purwokerto">East Purwokerto</option>
                  <option value="West Purwokerto">West Purwokerto</option>
                </select>
              </div>
              <div className="col-3">
                <select className="form-select py-2" aria-label="movie-name">
                  <option defaultValue={""}>Select movie</option>
                  <option value="Fantastic Beast">Fantastic Beast</option>
                  <option value="Spiderman">Spiderman</option>
                </select>
              </div>
            </div>
          </div>
          <div className="container-lg">
            <div className="card border-0 p-5">
              <div className="row row-cols-3 g-5 px-3 py-2">
                {schedules.data.map((schedule) => (
                  <div className="col" key={schedule.id}>
                    <ScheduleCard data={schedule} dataOrder={{}} pathname={location.pathname} />
                  </div>
                ))}
              </div>
            </div>
            <div className="d-flex justify-content-center mt-4 mb-2">
              <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                breakLabel={"..."}
                pageCount={schedules.pageInfo.totalPage}
                onPageChange={handlePagination}
                containerClassName={"pagination"}
                pageClassName={"page-item px-1"}
                pageLinkClassName={"page-link rounded px-3 py-2"}
                previousClassName={"page-item visually-hidden"}
                previousLinkClassName={"page-link px-3 py-2"}
                nextClassName={"page-item visually-hidden"}
                nextLinkClassName={"page-link px-3 py-2"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
                activeLinkClassName={"shadow"}
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default ManageSchedule;
