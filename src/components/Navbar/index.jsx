import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "../../utils/axios";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dataUser = JSON.parse(localStorage.getItem("dataUser"));

  const handleLogout = async () => {
    localStorage.clear();
    await axios.post("auth/logout");
  };

  return (
    <nav className="navbar navbar-expand-md navbar-light bg-white fixed-top text-center shadow-sm px-3 px-lg-0">
      <div className="container-lg">
        <Link to="/" className="navbar-brand">
          <img
            src={require("../../assets/img/logo/logo-nav.png")}
            alt="logo tickitz"
            height="24"
            className="me-4"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul
            className={`navbar-nav me-auto my-2 ${
              dataUser?.role === "admin" ? "d-none" : "d-flex"
            }`}
          >
            <li className="nav-item">
              <Link
                to="/"
                className={`nav-link ${location.pathname === "/" ? "text-primary" : ""}`}
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <hr className="my-1" />
            <li className="nav-item">
              <Link
                to="/list-movie"
                className={`nav-link ${location.pathname === "/list-movie" ? "text-primary" : ""}`}
              >
                List Movie
              </Link>
            </li>
            <hr className="my-1" />
          </ul>
          <ul
            className={`navbar-nav me-auto my-2 ${
              dataUser?.role === "admin" ? "d-flex" : "d-none"
            }`}
          >
            <li className="nav-item">
              <Link
                to="/dashboard"
                className={`nav-link ${location.pathname === "/dashboard" ? "text-primary" : ""}`}
              >
                Dashboard
              </Link>
            </li>
            <hr className="my-1" />
            <li className="nav-item">
              <Link
                to="/manage-movie"
                className={`nav-link ${
                  location.pathname === "/manage-movie" ? "text-primary" : ""
                }`}
              >
                Manage Movie
              </Link>
            </li>
            <hr className="my-1" />
            <li className="nav-item">
              <Link
                to="/manage-schedule"
                className={`nav-link ${
                  location.pathname === "/manage-schedule" ? "text-primary" : ""
                }`}
              >
                Manage Schedule
              </Link>
            </li>
            <hr className="my-1" />
          </ul>
          <Link
            to="/signin"
            className={`btn btn-primary py-2 ${dataUser ? "d-none" : "d-block"}`}
            role="button"
          >
            Sign in
          </Link>
          <div className={`user-only ${dataUser ? "d-flex" : "d-none"} align-items-center`}>
            <div>
              <i className="bi bi-search"></i>
            </div>

            <div className="dropdown ms-5">
              <button
                className="bg-transparent border-0 dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                data-bs-offset="  0,20"
              >
                <img
                  src={dataUser ? dataUser.imagePath : ""}
                  alt="profile"
                  className="rounded-circle"
                  style={{ width: "44px" }}
                />
              </button>
              <ul
                className="dropdown-menu dropdown-menu-end rounded-3"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <Link className="dropdown-item" to="#">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to="/" className="dropdown-item" onClick={handleLogout}>
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
