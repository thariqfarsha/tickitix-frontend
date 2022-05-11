import React from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Card from "../../components/Card";
import ReactPaginate from "react-paginate";

function ManageMovie() {
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
          <h2 className="h4 fw-bold mb-3">Form Movie</h2>
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
                      <input type="text" className="form-control" id="movie-name" />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="director" className="form-label">
                        Director
                      </label>
                      <input type="text" className="form-control" id="director" />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="release-date" className="form-label">
                        Release Date
                      </label>
                      <input type="date" className="form-control" id="release-date" />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="mb-4">
                      <label htmlFor="category" className="form-label">
                        Category
                      </label>
                      <input type="text" className="form-control" id="category" />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="casts" className="form-label">
                        Casts
                      </label>
                      <input type="text" className="form-control" id="casts" />
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <div className="mb-4">
                          <label htmlFor="duration-hour" className="form-label">
                            Duration Hour
                          </label>
                          <input type="number" className="form-control" id="duration-hour" />
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="mb-4">
                          <label htmlFor="duration-minute" className="form-label">
                            Duration Minute
                          </label>
                          <input type="number" className="form-control" id="duration-minute" />
                        </div>
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
                <textarea type="text" className="form-control" id="synopsis" />
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

export default ManageMovie;
