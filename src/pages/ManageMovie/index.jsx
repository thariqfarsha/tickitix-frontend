import React, { useEffect, useRef, useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Card from "../../components/Card";
import ReactPaginate from "react-paginate";
import { useSelector, useDispatch } from "react-redux";
import {
  getDataMovieRedux,
  postMovieRedux,
  updateMovieRedux,
  deleteMovieRedux
} from "../../stores/action/movie";
import { useLocation } from "react-router-dom";
import "./index.css";
import { Toast } from "bootstrap";

function ManageMovie() {
  document.title = "Manage Movie | Tickitix";

  const location = useLocation();
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movie);
  const [page, setPage] = useState(1);
  const limit = 8;
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("createdAt desc");
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState({
    name: "",
    category: "",
    director: "",
    cast: "",
    releaseDate: "",
    hour: "",
    minute: "",
    duration: "",
    synopsis: "",
    image: null
  });
  const [movieId, setMovieId] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const toastNotif = useRef(null);

  const isAllFormFilled = Object.keys(form).every((el) => form[el]);

  useEffect(() => {
    getDataMovie();
  }, []);

  useEffect(() => {
    getDataMovie();
  }, [page]);

  useEffect(() => {
    setPage(1);
    getDataMovie();
  }, [sort]);

  useEffect(() => {
    setForm({ ...form, duration: form.hour + "h " + form.minute + "m" });
  }, [form.hour, form.minute]);

  useEffect(() => {
    if (!selectedFile) {
      setPreview(preview);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const handleSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    setSelectedFile(e.target.files[0]);
    setForm({ ...form, image: e.target.files[0] });
  };

  const getDataMovie = async () => {
    try {
      dispatch(getDataMovieRedux(page, limit, search, sort, ""));
    } catch (error) {
      console.log(error.response);
    }
  };

  const handlePagination = (e) => {
    setPage(e.selected + 1);
  };

  const handleChangeForm = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const setUpdate = (data) => {
    const { id, name, category, director, cast, releaseDate, duration, synopsis, imagePath } = data;
    setForm({
      ...form,
      name,
      category,
      director,
      cast,
      releaseDate: releaseDate.split("T")[0],
      hour: duration === "-" ? "-" : duration.split(" ")[0].split("h")[0],
      minute: duration === "-" ? "-" : duration.split(" ")[1].split("m")[0],
      synopsis
    });
    setMovieId(id);
    setIsUpdate(true);
    setPreview(imagePath);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      for (const data in form) {
        formData.append(data, form[data]);
      }
      await dispatch(updateMovieRedux(movieId, formData));
      setIsUpdate(false);
      setPreview(null);
      resetForm();
      setToastMsg("Movie updated!");
      showToast();
      getDataMovie();
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteMovieRedux(id));
      setToastMsg("Movie deleted!");
      showToast();
      getDataMovie();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      for (const data in form) {
        formData.append(data, form[data]);
      }
      await dispatch(postMovieRedux(formData));
      setPreview(null);
      resetForm();
      setToastMsg("Movie created!");
      showToast();
      getDataMovie();
    } catch (error) {
      console.log(error.response);
    }
  };

  const resetForm = () => {
    setForm({
      name: "",
      category: "",
      director: "",
      cast: "",
      releaseDate: "",
      hour: "",
      minute: "",
      duration: "",
      synopsis: "",
      image: null
    });
    setPreview(null);
    setIsUpdate(false);
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setPage(1);
      getDataMovie();
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
          <h2 className="h4 fw-bold mb-3">Form Movie</h2>
          <div className="card border-0 p-5">
            <form onSubmit={isUpdate ? handleUpdate : handleSubmit} onReset={resetForm}>
              <div className="row gx-5 mb-4">
                <div className="col-md-3 mb-4">
                  <label htmlFor="formFile" className="form-label card p-4 movie-image-upload">
                    <img
                      src={!preview ? "https://via.placeholder.com/200x300.png?text=+" : preview}
                      alt="movie preview"
                    />
                  </label>
                  <input
                    className="form-control visually-hidden"
                    type="file"
                    id="formFile"
                    onChange={handleSelectFile}
                  />
                </div>
                <div className="col-md-9">
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="mb-4">
                        <label htmlFor="movie-name" className="form-label">
                          Movie Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="movie-name"
                          name="name"
                          placeholder="Input movie name"
                          onChange={handleChangeForm}
                          value={form.name}
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="director" className="form-label">
                          Director
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="director"
                          name="director"
                          placeholder="Input movie director"
                          onChange={handleChangeForm}
                          value={form.director}
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="release-date" className="form-label">
                          Release Date
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          id="release-date"
                          name="releaseDate"
                          onChange={handleChangeForm}
                          value={form.releaseDate}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="mb-4">
                        <label htmlFor="category" className="form-label">
                          Category
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="category"
                          name="category"
                          placeholder="Input movie category"
                          onChange={handleChangeForm}
                          value={form.category}
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="casts" className="form-label">
                          Casts
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="casts"
                          name="cast"
                          placeholder="Input movie casts"
                          onChange={handleChangeForm}
                          value={form.cast}
                        />
                      </div>
                      <div className="row mb-4">
                        <div className="col-6">
                          <label htmlFor="duration-hour" className="form-label">
                            Duration Hour
                          </label>
                          <input
                            type="text"
                            maxLength={1}
                            className="form-control"
                            id="duration-hour"
                            name="hour"
                            placeholder="hh"
                            onChange={handleChangeForm}
                            value={form.hour}
                          />
                        </div>
                        <div className="col-6">
                          <label htmlFor="duration-minute" className="form-label">
                            Duration Minute
                          </label>
                          <input
                            type="text"
                            maxLength={2}
                            className="form-control"
                            id="duration-minute"
                            name="minute"
                            placeholder="mm"
                            onChange={handleChangeForm}
                            value={form.minute}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="synopsis mb-2">
                <div className="mb-4">
                  <label htmlFor="synopsis" className="form-label">
                    Synopsis
                  </label>
                  <textarea
                    type="text"
                    className="form-control"
                    id="synopsis"
                    name="synopsis"
                    placeholder="Input movie synopsis"
                    onChange={handleChangeForm}
                    value={form.synopsis}
                  />
                </div>
              </div>
              <div className="row buttons justify-content-end">
                <div className="col-md-2 order-2 order-md-1">
                  <button type="reset" className="btn btn-outline-primary py-2 w-100">
                    Reset
                  </button>
                </div>
                <div className="col-md-2 order-1 order-md-2 mb-3">
                  <button
                    type="submit"
                    className="btn btn-primary fw-semibold py-2 w-100"
                    disabled={!isAllFormFilled}
                  >
                    {isUpdate ? "Update" : "Add Movie"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>

        <section className="data-movie">
          <div className="container-lg my-4">
            <div className="row align-items-center">
              <div className="col-md-2">
                <h2 className="h4 fw-bold">List Movie</h2>
              </div>
              <div className="col-md-5"></div>
              <div className="col-4 col-md-2">
                <select
                  className="form-select py-2"
                  aria-label="movie sort method"
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option defaultValue="" value="">
                    -- Sort --
                  </option>
                  <option value="name asc">Title A-Z</option>
                  <option value="name desc">Title Z-A</option>
                </select>
              </div>
              <div className="col-8 col-md-3">
                <input
                  type="text"
                  className="form-control py-2"
                  aria-label="search movie name"
                  placeholder="Search movie name..."
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={handleSearch}
                />
              </div>
            </div>
          </div>
          <div className="container-lg">
            <div className="card border-0 p-0 p-sm-3 p-md-5">
              {movies.isLoading ? (
                <div className="d-flex justify-content-center">
                  <div className="spinner-grow text-primary text-center" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 g-3 g-sm-4 g-md-5 px-3 py-3">
                  {movies.data.map((movie) => (
                    <div className="col" key={movie.id}>
                      <Card
                        data={movie}
                        pathname={location.pathname}
                        setUpdate={setUpdate}
                        setMovieId={setMovieId}
                        // handleDelete={handleDelete}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="d-flex justify-content-center mt-4 mb-2">
              <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                breakLabel={"..."}
                pageCount={movies.pageInfo.totalPage}
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
              <p className="mb-0">Are you sure to delete this movie?</p>
            </div>
            <div className="modal-footer border-0 px-4 pt-0 pb-3">
              <button type="button" className="btn btn-secondary py-2 px-3" data-bs-dismiss="modal">
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger py-2 px-3"
                data-bs-dismiss="modal"
                onClick={() => handleDelete(movieId)}
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

export default ManageMovie;
