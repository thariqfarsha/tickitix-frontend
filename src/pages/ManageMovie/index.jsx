import React, { useEffect, useState } from "react";
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

function ManageMovie() {
  const location = useLocation();
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movie);
  const [page, setPage] = useState(1);
  const limit = 8;
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
  const [MovieId, setMovieId] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    getDataMovie();
  }, []);

  useEffect(() => {
    getDataMovie();
  }, [page]);

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
      dispatch(getDataMovieRedux(page, limit));
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
      // } else if (name === "hour") {
      //   setForm({ ...form, duration: form.duration + value + "h " });
      //   console.log(name);
      // } else if (name === "minute") {
      //   setForm({ ...form, duration: form.duration + value + "m" });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const setUpdate = (data) => {
    console.log(data);
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
      await dispatch(updateMovieRedux(MovieId, formData));
      setIsUpdate(false);
      setPreview(null);
      resetForm();
      getDataMovie();
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleDelete = async (id) => {
    await dispatch(deleteMovieRedux(id));
    getDataMovie();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(form);
      const formData = new FormData();
      for (const data in form) {
        formData.append(data, form[data]);
      }
      await dispatch(postMovieRedux(formData));
      setPreview(null);
      resetForm();
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
                <div className="col-3">
                  <label htmlFor="formFile" className="form-label card p-4 movie-image-upload">
                    <img
                      src={!preview ? "https://via.placeholder.com/200x300.png?text=+" : preview}
                      alt="movie image preview"
                    />
                    {/* <img
                      src={"https://via.placeholder.com/200x300.png?text=+"}
                      alt="spiderman"
                      className="img-fluid"
                    /> */}
                  </label>
                  <input
                    className="form-control visually-hidden"
                    type="file"
                    id="formFile"
                    onChange={handleSelectFile}
                  />
                </div>
                <div className="col-9">
                  <div className="row">
                    <div className="col-6">
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
                    <div className="col-6">
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
                <div className="col-2">
                  <button type="reset" className="btn btn-outline-primary w-100">
                    Reset
                  </button>
                </div>
                <div className="col-2">
                  <button type="submit" className="btn btn-primary fw-semibold w-100">
                    {isUpdate ? "Update" : "Save"}
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
                <h2 className="h4 fw-bold mb-3">List Movie</h2>
              </div>
              <div className="col-6"></div>
              <div className="col-1">
                <select className="form-select py-2" aria-label="movie sort method">
                  <option defaultValue={""}>Sort</option>
                  <option value="name asc">A - Z</option>
                  <option value="name desc">Z - A</option>
                </select>
              </div>
              <div className="col-3">
                <input
                  type="text"
                  className="form-control py-2"
                  aria-label="search movie name"
                  placeholder="Search movie name..."
                />
              </div>
            </div>
          </div>
          <div className="container-lg">
            <div className="card border-0 p-5">
              {movies.isLoading ? (
                <div className="d-flex justify-content-center">
                  <div className="spinner-grow text-primary text-center" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <div className="row row-cols-4 g-5 px-3 py-2">
                  {movies.data.map((movie) => (
                    <div className="col" key={movie.id}>
                      <Card
                        data={movie}
                        pathname={location.pathname}
                        setUpdate={setUpdate}
                        handleDelete={handleDelete}
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

      <Footer />
    </>
  );
}

export default ManageMovie;
