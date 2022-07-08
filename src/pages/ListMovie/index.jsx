import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Card from "../../components/Card";
import Footer from "../../components/Footer";
import MonthFilter from "../../components/MonthFilter";
import Navbar from "../../components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { getDataMovieRedux } from "../../stores/action/movie";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";

function ListMovie() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const params = Object.fromEntries([...searchParams]);

  console.log(params.search);
  const movies = useSelector((state) => state.movie);

  const limit = 8;
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState(params.search || "");
  // const { search } = params;
  const [sort, setSort] = useState("createdAt desc");
  const [month, setMonth] = useState(params.month && new Date().getMonth());

  console.log("search", search);
  useEffect(() => {
    getDataMovie();
  }, []);

  useEffect(() => {
    getDataMovie();
    setSearch("");
    const params = {};
    if (page !== "1") {
      params.page = page;
    }
    if (month) {
      params.month = month;
    }
    navigate({
      pathname: "/list-movie",
      search: `?${createSearchParams(params)}`
    });
  }, [page, month]);

  useEffect(() => {
    getDataMovie();
  }, [search]);

  useEffect(() => {
    setSearch(params.search);
  }, [params.search]);

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

  return (
    <>
      <Navbar setMonth={setMonth} />

      <main className="bg-primary-light pb-4">
        <div className="container-lg my-4">
          <div className="row">
            <div className="col-2 d-flex align-items-center">
              <h2 className="h4 fw-bold mb-0">List Movie</h2>
            </div>
            <div className="col-6"></div>
            <div className="col-1 col-md-4">
              <select
                className="form-select py-2"
                aria-label="movie sort method"
                onChange={(e) => setSort(e.target.value)}
              >
                <option defaultValue={""}>Sort</option>
                <option value="name asc">Title A-Z</option>
                <option value="name desc">Title Z-A</option>
              </select>
            </div>
            <div className="col-3 d-block d-md-none">
              <input
                type="text"
                className="form-control py-2"
                aria-label="search movie name"
                placeholder="Search movie name..."
              />
            </div>
          </div>
        </div>
        <MonthFilter month={month} setMonth={setMonth} firstMonth={new Date().getMonth()} />
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
