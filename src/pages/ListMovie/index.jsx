import React from "react";
import ReactPaginate from "react-paginate";
import Card from "../../components/Card";
import Footer from "../../components/Footer";
import MonthFilter from "../../components/MonthFilter";
import Navbar from "../../components/Navbar";

function ListMovie() {
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
        <div className="container-lg my-4">
          <div className="row">
            <div className="col-2">
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
        <MonthFilter />
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
      </main>

      <Footer />
    </>
  );
}

export default ListMovie;
