import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import axios from "../../utils/axios";

export default function Dashboard() {
  const [dataRevenue, setDataRevenue] = useState([]);
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState("");
  const premieres = [{ name: "ebv.id" }, { name: "hiflix" }, { name: "cineOne21" }];
  const [premiere, setPremiere] = useState("");
  const locations = [{ name: "Jakarta" }, { name: "Depok" }, { name: "Bogor" }];
  const [location, setLocation] = useState("");
  const [filter, setFilter] = useState({
    movie: "",
    premiere: "",
    location: ""
  });

  useEffect(() => {
    getRevenue();
    getMovies();
  }, []);

  useEffect(() => {
    getRevenue();
  }, [filter]);

  const getRevenue = async () => {
    try {
      const result = await axios.get(
        `booking/dashboard?premiere=${filter.premiere}&movieId=${filter.movie}&location=${filter.location}`
      );
      setDataRevenue(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getMovies = async () => {
    try {
      const result = await axios.get(`movie?page=1&limit=26&sort=createdAt asc`);
      setMovies(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeFilter = (e) => {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value
    });
  };

  const handleReset = () => {
    setFilter({
      movie: "",
      premiere: "",
      location: ""
    });
  };

  return (
    <>
      <Navbar />

      <main className="bg-primary bg-opacity-10 pb-4">
        <div className="container-lg">
          <div className="row my-4">
            <div className="col-md-9">
              <h4 className="fw-bold mb-3">Dashboard</h4>
              <div className="bg-white rounded p-4 mb-4">
                <ResponsiveContainer width="100%" height={360}>
                  <LineChart
                    width={500}
                    height={300}
                    data={dataRevenue.sort((a, b) => a.month - b.month)}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5
                    }}
                  >
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="#602eea" activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="col-md-3">
              <h4 className="fw-bold mb-3">Filter</h4>
              <div className="bg-white rounded p-4">
                <div className="mb-4">
                  <select
                    className="form-select py-2"
                    name="movie"
                    onChange={handleChangeFilter}
                    aria-label="Movie filter selection"
                  >
                    <option defaultValue="" value="">
                      -- Select movie --
                    </option>
                    {movies.map((movie) => (
                      <option key={movie.id} value={movie.id}>
                        {movie.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <select
                    className="form-select py-2"
                    name="premiere"
                    onChange={handleChangeFilter}
                    aria-label="Premiere filter selection"
                  >
                    <option defaultValue="" value="">
                      -- Select premiere --
                    </option>
                    {premieres.map((premiere) => (
                      <option key={premiere.name} value={premiere.name}>
                        {premiere.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <select
                    className="form-select py-2"
                    name="location"
                    onChange={handleChangeFilter}
                    aria-label="Location filter selection"
                  >
                    <option defaultValue="" value="">
                      -- Select location --
                    </option>
                    {locations.map((location) => (
                      <option key={location.name} value={location.name}>
                        {location.name}
                      </option>
                    ))}
                  </select>
                </div>
                <button className="btn btn-outline-primary py-2 w-100" onClick={handleReset}>
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
