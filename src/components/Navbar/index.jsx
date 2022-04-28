import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const dataUser = JSON.parse(localStorage.getItem("dataUser"));

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
          <ul className="navbar-nav me-auto my-2">
            <li className="nav-item">
              <Link to="/" className="nav-link active" aria-current="page">
                Home
              </Link>
            </li>
            <hr className="my-1" />
            <li className="nav-item">
              <Link to="#" className="nav-link">
                List Movie
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
            <div className="profilePicture">
              <img
                src={dataUser ? dataUser.imagePath : ""}
                alt="profile"
                className="rounded-circle ms-5"
                style={{ width: "44px" }}
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
