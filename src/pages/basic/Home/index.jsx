import axios from "../../../utils/axios";
import React, { useEffect, useState } from "react";
import Card from "../../../components/basic/Card";
import Pagination from "react-paginate";

function Home() {
  const limit = 6;
  const [page, setPage] = useState(1);
  const [dataMovie, setDataMovie] = useState([]);
  const [pageInfo, setPageInfo] = useState({});

  useEffect(() => {
    console.log("mounted");
    getDataMovie();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getDataMovie();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const getDataMovie = async () => {
    try {
      console.log("GET DATA MOVIE");

      // INPUT
      // console.log(limit);
      // console.log(page);

      // PROSES
      const resultMovie = await axios.get(`movie?page=${page}&limit=${limit}`);
      console.log(resultMovie);

      // OUTPUT
      setDataMovie(resultMovie.data.data);
      setPageInfo(resultMovie.data.pagination);
    } catch (error) {
      console.log(error.response);
    }
  };

  // Kalo mau ngecek dataMovie sama pageInfo di luar function getDataMovie, soalnya functionnya async,
  // console.log jalan duluan tapi dataMovie sama pageInfo belum ada isinya
  console.log(dataMovie);
  console.log(pageInfo);

  const handleDetailMovie = (id) => {
    console.log(id);
  };

  const handlePagination = (data) => {
    console.log(data.selected + 1);
    setPage(data.selected + 1);
  };

  return (
    <div className="text-center container">
      <h1>Home Page</h1>
      <hr />
      <div className="row">
        {dataMovie.map((item) => (
          <div className="col-md-4" key={item.id}>
            <Card data={item} handleDetail={handleDetailMovie} />
          </div>
        ))}
      </div>
      <Pagination
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={pageInfo.totalPage}
        onPageChange={handlePagination}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
      />
    </div>
  );
}

export default Home;
