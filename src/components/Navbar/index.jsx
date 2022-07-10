import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { logout } from "../../stores/action/user";

function Navbar(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const dataUser = useSelector((state) => state.user.data);
  const refreshToken = localStorage.getItem("refreshToken");

  const handleLogout = async () => {
    try {
      await dispatch(logout(refreshToken));
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="navbar navbar-expand-md navbar-light bg-white fixed-top text-center shadow-sm px-3 px-lg-0">
      <div className="container-lg">
        <Link to="/" className="navbar-brand">
          <img
            src={require("../../assets/img/logo/logo-color.png")}
            alt="logo tickitz"
            height="28"
            className="me-4 mb-1"
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
          {Object.keys(dataUser).length === 0 ? (
            <Link to="/signin" className={"btn btn-primary py-2"} role="button">
              Sign in
            </Link>
          ) : (
            <div className={"d-flex align-items-center"}>
              <div className="dropdown ms-5">
                <button
                  type="button"
                  className="bg-transparent border-0"
                  id="dropdownProfileMenu"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  data-bs-offset="0,20"
                >
                  <img
                    src={
                      dataUser.imagePath
                        ? dataUser.imagePath
                        : `https://ui-avatars.com/api/?name=${dataUser.firstName}+${dataUser.lastName}&background=random&size=44`
                    }
                    alt="profile"
                    className="rounded-circle"
                    style={{ width: "44px" }}
                  />
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-end rounded-3"
                  aria-labelledby="dropdownProfileMenu"
                >
                  <li>
                    <Link className="dropdown-item" to={`/user/${dataUser.id}`}>
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
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
