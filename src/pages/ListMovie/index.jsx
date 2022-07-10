import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Card from "../../components/Card";
import Footer from "../../components/Footer";
import MonthFilter from "../../components/MonthFilter";
import Navbar from "../../components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { getDataMovieRedux } from "../../stores/action/movie";
import { useLocation } from "react-router-dom";

function ListMovie() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { state } = location;

  const movies = useSelector((state) => state.movie);

  const limit = 8;
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("createdAt desc");
  const [month, setMonth] = useState(state?.month || new Date().getMonth());

  useEffect(() => {
    getDataMovie();
  }, [page]);

  useEffect(() => {
    setPage(1);
    getDataMovie();
  }, [month, sort]);

  useEffect(() => {
    setPage(1);
    setMonth("");
    getDataMovie();
  }, [search]);

  const getDataMovie = async () => {
    try {
      dispatch(getDataMovieRedux(page, limit, search, sort, month));
    } catch (error) {
      console.log(error.response);
    }
  };

  const handlePagination = (e) => {
    setPage(e.selected + 1);
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setSearch(e.target.value);
    }
  };

  return (
    <>
      <Navbar setMonth={setMonth} />

      <main className="bg-primary-light pb-4">
        <div className="container-lg my-4">
          <div className="row">
            <div className="col-md-2 d-flex align-items-center mb-3 mb-md-0">
              <h2 className="h4 fw-bold mb-0">List Movie</h2>
            </div>
            <div className="col-md-4"></div>
            <div className="col-4 col-md-2">
              <select
                className="form-select py-2"
                aria-label="movie sort method"
                onChange={(e) => setSort(e.target.value)}
              >
                <option defaultValue={""} value="">
                  Sort
                </option>
                <option value="name asc">Title A-Z</option>
                <option value="name desc">Title Z-A</option>
              </select>
            </div>
            <div className="col-md-4">
              <input
                type="text"
                className="form-control py-2"
                aria-label="search movie name"
                placeholder="Search movie name..."
                onKeyDown={handleSearch}
              />
            </div>
          </div>
        </div>
        <MonthFilter month={month} setMonth={setMonth} firstMonth={new Date().getMonth()} />
        <div className="container-lg">
          <div className="card border-0 p-1 p-md-5">
            {movies.isLoading ? (
              <div className="d-flex justify-content-center">
                <div className="spinner-grow text-primary text-center" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 g-3 g-sm-4 g-md-5 px-3 py-2">
                {movies.data.map((movie) => (
                  <div className="col" key={movie.id}>
                    <Card data={movie} />
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
      </main>

      <Footer />
    </>
  );
}

export default ListMovie;
