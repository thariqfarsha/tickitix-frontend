import React, { useEffect, useRef, useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
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
import { Toast } from "bootstrap";
import "./index.css";

function ManageSchedule() {
  document.title = "Manage Schedule | Tickitix";

  const location = useLocation();
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movie);
  const schedules = useSelector((state) => state.schedule);

  const limit = 6;
  const [scheduleId, setScheduleId] = useState("");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("createdAt desc");
  const [premiereLocation, setPremiereLocation] = useState("");
  const [preview, setPreview] = useState(null);
  const [showInputTime, setShowInputTime] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [time, setTime] = useState([]);
  const [form, setForm] = useState({
    movieId: null,
    premiere: "",
    price: 0,
    location: "",
    dateStart: "",
    dateEnd: "",
    time: ""
  });
  const premiereList = ["ebv.id", "hiflix", "cineOne21"];
  const toastNotif = useRef(null);

  const isAllFormFilled = Object.keys(form).every((el) => form[el]);
  console.log("fill", isAllFormFilled);
  console.log(form);

  console.log(scheduleId);

  useEffect(() => {
    getAllMovie();
  }, []);

  useEffect(() => {
    getScheduleByMovieId();
  }, [form.movieId, page]);

  useEffect(() => {
    setPage(1);
    getScheduleByMovieId();
  }, [sort, premiereLocation]);

  useEffect(() => {
    setForm({ ...form, time: time.join() });
  }, [time]);

  const getAllMovie = async () => {
    try {
      await dispatch(getDataMovieRedux(1, 100, "", "name asc", ""));
    } catch (error) {
      console.log(error.response);
    }
  };

  const getScheduleByMovieId = async () => {
    try {
      await dispatch(getDataScheduleRedux(form.movieId, page, limit, sort, premiereLocation));
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
      setForm({ ...form, movieId: +e.target.value });
      return;
    }

    if (e.target.name === "price") {
      setForm({ ...form, [e.target.name]: +e.target.value });
      return;
    }

    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addTime = (e) => {
    if (e.key === "Enter") {
      setShowInputTime(false);
      if (e.target.value === "") {
        return;
      }
      setTime([...time, e.target.value]);
    }
  };

  const deleteTime = (item) => {
    const filteredTime = time.filter((el) => el !== item);
    setTime(filteredTime);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(postScheduleRedux(form));
      resetForm();
      setToastMsg("Schedule created!");
      showToast();
      getScheduleByMovieId();
    } catch (error) {
      console.log(error.response);
    }
  };

  const setUpdate = (data) => {
    console.log(data);
    const { id, premiere, price, location, dateStart, dateEnd, time: dataTime } = data;
    setForm({
      ...form,
      premiere,
      price,
      location,
      dateStart: dateStart.split("T")[0],
      dateEnd: dateEnd.split("T")[0],
      time: dataTime
    });
    setTime(dataTime.split(","));
    setScheduleId(id);
    setIsUpdate(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateScheduleRedux(scheduleId, form));
      setIsUpdate(false);
      resetForm();
      setToastMsg("Schedule updated!");
      showToast();
      getScheduleByMovieId();
    } catch (error) {
      console.log(error.response);
    }
  };

  const resetForm = () => {
    setForm({
      ...form,
      // movieId: null,
      premiere: "",
      price: 0,
      location: "",
      dateStart: "",
      dateEnd: "",
      time: ""
    });
    setTime([]);
    setIsUpdate(false);
    setShowInputTime(false);
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteScheduleRedux(id));
      setToastMsg("Schedule deleted!");
      showToast();
      getScheduleByMovieId();
    } catch (error) {
      console.log(error);
    }
  };

  const showToast = () => {
    const toast = new Toast(toastNotif.current);
    toast.show();
  };

  return (
    <>
      <Navbar />

      <main className="bg-primary-light pb-4">
        <section className="form-movie container-lg mt-4 mb-5">
          <h2 className="h4 fw-bold mb-3">Form Schedule</h2>
          <div className="card border-0 p-4 p-sm-5">
            <form onSubmit={isUpdate ? handleUpdate : handleSubmit} onReset={resetForm}>
              <div className="row gx-5 mb-4">
                <div className="col-md-3 mb-4 d-flex justify-content-center">
                  <div className="card p-4">
                    <img
                      src={!preview ? "https://via.placeholder.com/200x300.png?text=+" : preview}
                      alt="movie poster"
                      height="100%"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </div>
                <div className="col-md-9">
                  <div className="row">
                    <div className="col-md-6">
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
                          <option defaultValue={""} value="">
                            -- Select movie --
                          </option>
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
                        <input
                          type="text"
                          className="form-control"
                          id="price"
                          name="price"
                          value={form.price}
                          onChange={handleChangeForm}
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="premiere" className="form-label">
                          Premiere
                        </label>
                        <div className="row" id="premiere">
                          {premiereList.map((el) => (
                            <div className="col-4 d-flex align-items-center" key={el}>
                              <button
                                className={`btn ${
                                  el === form.premiere ? "bg-primary bg-opacity-25 shadow" : ""
                                }`}
                                value={form.premiere}
                                onClick={() => setForm({ ...form, premiere: el })}
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
                    <div className="col-md-6">
                      <div className="mb-4">
                        <label htmlFor="location" className="form-label">
                          Location
                        </label>
                        <select
                          className="form-select"
                          id="location"
                          name="location"
                          onChange={handleChangeForm}
                        >
                          <option defaultValue={""} value="">
                            -- Select location --
                          </option>
                          <option value="Jakarta">Jakarta</option>
                          <option value="Bogor">Bogor</option>
                          <option value="Depok">Depok</option>
                        </select>
                      </div>
                      <div className="row mb-4">
                        <div className="col-6">
                          <label htmlFor="date-start" className="form-label">
                            Date Start
                          </label>
                          <input
                            type="date"
                            className="form-control"
                            id="date-start"
                            name="dateStart"
                            value={form.dateStart}
                            onChange={handleChangeForm}
                          />
                        </div>
                        <div className="col-6">
                          <label htmlFor="date-end" className="form-label">
                            Date End
                          </label>
                          <input
                            type="date"
                            className="form-control"
                            id="date-end"
                            name="dateEnd"
                            value={form.dateEnd}
                            onChange={handleChangeForm}
                          />
                        </div>
                      </div>
                      <div className="mb-4">
                        <label htmlFor="location" className="form-label">
                          Time
                        </label>
                        <div className="row row-cols-md-3 row-cols-lg-4 gy-3">
                          <div className="col-3">
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
                          {time.map((el) => (
                            <div className="col" key={el}>
                              <button
                                type="button"
                                className="btn btn-time text-nowrap w-100 py-1 px-1"
                                onClick={() => deleteTime(el)}
                              >
                                {el}
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row buttons justify-content-end">
                <div className="col-sm-6 col-md-2 order-2 order-md-1">
                  <button type="reset" className="btn btn-outline-primary py-2 w-100">
                    Reset
                  </button>
                </div>
                <div className="col-sm-6 col-md-3 order-1 order-md-2">
                  <button
                    type="submit"
                    className="btn btn-primary fw-semibold py-2 w-100 mb-3"
                    disabled={isAllFormFilled ? false : true}
                  >
                    {isUpdate ? "Update Schedule" : "Add Schedule"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>

        <section className="data-movie">
          <div className="container-lg my-4">
            <div className="row">
              <div className="col-md-2 d-flex align-items-center">
                <h2 className="h4 fw-bold mb-3">List Schedule</h2>
              </div>
              <div className="col-md-5"></div>
              <div className="col-5 col-md-2">
                <select
                  className="form-select py-2"
                  aria-label="movie sort method"
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option defaultValue={""} value="">
                    -- Sort --
                  </option>
                  <option value="premiere asc">Premiere A - Z</option>
                  <option value="premiere desc">Premiere Z - A</option>
                </select>
              </div>
              <div className="col-7 col-md-3">
                <select
                  className="form-select py-2"
                  aria-label="location"
                  value={form.location}
                  onChange={(e) => setPremiereLocation(e.target.value)}
                >
                  <option defaultValue={""} value="">
                    -- Select location --
                  </option>
                  <option value="Jakarta">Jakarta</option>
                  <option value="Bogor">Bogor</option>
                  <option value="Depok">Depok</option>
                </select>
              </div>
            </div>
          </div>
          <div className="container-lg">
            <div className="card border-0 p-3 p-md-5">
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-5 px-3 py-2">
                {schedules.data.map((schedule) => (
                  <div className="col" key={schedule.id}>
                    <ScheduleCard
                      data={schedule}
                      setUpdate={setUpdate}
                      handleDelete={handleDelete}
                      setScheduleId={setScheduleId}
                      pathname={location.pathname}
                    />
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

      {/* Toast Notification */}
      <div
        className="toast align-items-center text-white bg-primary border-0 position-fixed"
        style={{ zIndex: 11, top: "13%", right: "1%" }}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        ref={toastNotif}
      >
        <div className="d-flex">
          <div className="toast-body fw-bold">{toastMsg || "No notification"}</div>
          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
      </div>

      {/* Modal Delete Confirmation */}
      <div
        className="modal fade"
        id="deleteModal"
        tabIndex="-1"
        aria-labelledby="deleteConfirmationModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0" style={{ borderRadius: 16 }}>
            <div className="modal-header border-0 px-4">
              <h5 className="modal-title fw-semibold">Delete Confirmation</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body px-4">
              <p className="mb-0">Are you sure to delete this schedule?</p>
            </div>
            <div className="modal-footer border-0 px-4 pt-0 pb-3">
              <button type="button" className="btn btn-secondary py-2 px-3" data-bs-dismiss="modal">
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger py-2 px-3"
                data-bs-dismiss="modal"
                onClick={() => handleDelete(scheduleId)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ManageSchedule;
