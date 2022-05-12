import React, { useEffect } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Card from "../../components/Card";
import ReactPaginate from "react-paginate";
import { useSelector, useDispatch } from "react-redux";
import { getDataMovieRedux } from "../../stores/action/movie";

function ManageSchedule() {
  const dispatch = useDispatch();
  const movie = useSelector((state) => state.movie);

  useEffect(() => {
    getAllMovie();
  }, []);

  const getAllMovie = async () => {
    try {
      dispatch(getDataMovieRedux());
    } catch (error) {
      console.log(error.response);
    }
  };

  const pageInfo = {
    totalPage: 4
  };

  const handlePagination = () => {
    return;
  };

  return (
    <>
      <Navbar />

      <main className="bg-primary-light pb-4">
        <section className="form-movie container-lg mt-4 mb-5">
          <h2 className="h4 fw-bold mb-3">Form Schedule</h2>
          <div className="card border-0 p-5">
            <div className="row gx-5 mb-4">
              <div className="col-3">
                <div className="card p-4">
                  <img
                    src={"https://via.placeholder.com/200x300.png?text=+"}
                    alt="spiderman"
                    className="img-fluid"
                  />
                </div>
              </div>
              <div className="col-9">
                <div className="row">
                  <div className="col-6">
                    <div className="mb-4">
                      <label htmlFor="movie-name" className="form-label">
                        Movie Name
                      </label>
                      <select className="form-select" id="movie-name">
                        <option defaultValue={""}>Select movie</option>
                        <option value="Fantastic Beast">Fantastic Beast</option>
                        <option value="Spiderman">Spiderman</option>
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
                        <div className="col-4 d-flex align-items-center">
                          <button className="btn" value={"ebv.id"}>
                            <img
                              src={require("../../assets/img/logo/cinema/ebv.id.png")}
                              className="img-fluid"
                              alt="ebv.id"
                            />
                          </button>
                        </div>
                        <div className="col-4 d-flex align-items-center">
                          <button className="btn shadow" value={"hiflix"}>
                            <img
                              src={require("../../assets/img/logo/cinema/hiflix.png")}
                              className="img-fluid"
                              alt="hiflix"
                            />
                          </button>
                        </div>
                        <div className="col-4 d-flex align-items-center">
                          <button className="btn" value={"cineOne21"}>
                            <img
                              src={require("../../assets/img/logo/cinema/cineOne21.png")}
                              className="img-fluid"
                              alt="cineOne21"
                            />
                          </button>
                        </div>
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
                      <div className="row row-cols-4 gy-3">
                        <div className="col">
                          <button className="btn btn-outline-primary w-100 py-1">
                            <i className="bi bi-plus-lg"></i>
                          </button>
                        </div>
                        <div className="col">
                          <button className="btn text-nowrap w-100 py-1">08.00am</button>
                        </div>
                        <div className="col">
                          <button className="btn text-nowrap w-100 py-1">08.00am</button>
                        </div>
                        <div className="col">
                          <button className="btn text-nowrap w-100 py-1">08.00am</button>
                        </div>
                        <div className="col">
                          <button className="btn text-nowrap w-100 py-1">08.00am</button>
                        </div>
                        <div className="col">
                          <button className="btn text-nowrap w-100 py-1">08.00am</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row buttons justify-content-end">
              <div className="col-2">
                <button className="btn btn-outline-primary w-100">Reset</button>
              </div>
              <div className="col-2">
                <button className="btn btn-primary fw-semibold w-100">Submit</button>
              </div>
            </div>
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
              <div className="row g-5 px-3 py-2">
                <div className="col-3">
                  <Card />
                </div>
                <div className="col-3">
                  <Card />
                </div>
                <div className="col-3">
                  <Card />
                </div>
                <div className="col-3">
                  <Card />
                </div>
                <div className="col-3">
                  <Card />
                </div>
                <div className="col-3">
                  <Card />
                </div>
                <div className="col-3">
                  <Card />
                </div>
                <div className="col-3">
                  <Card />
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-center mt-4 mb-2">
              <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                breakLabel={"..."}
                pageCount={pageInfo.totalPage}
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
