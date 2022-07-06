import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

function Footer() {
  return (
    <footer className="container-fluid bg-white px-0 px-lg-0 pt-5">
      <div className="container-lg row mb-3 mb-sm-5 mx-auto">
        <div className="col-lg-4 col-sm-12 mb-4 mb-sm-5">
          <img
            src={require("../../assets/img/logo/logo-color.png")}
            alt="logo tickitz"
            className="mb-3 logo-footer"
          />
          <p className="d-block text-secondary">
            Stop waiting in line. Buy tickets
            <br />
            conveniently, watch movies quietly.
          </p>
        </div>
        <div className="col-lg-2 col-sm-3 mb-4">
          <h4 className="text-sm bold mb-2 mb-sm-4">Explore</h4>
          <ul className="list-unstyled mb-0">
            <li className="float-start float-sm-none me-4 me-sm-0 mb-2">
              <Link to="/" className="text-decoration-none link-secondary">
                Home
              </Link>
            </li>
            <li>
              <Link to="#" className="text-decoration-none link-secondary">
                List Movie
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-lg-3 col-sm-4 mb-5 cinema-logo">
          <h4 className="text-sm bold mb-3 mb-sm-4">Our Sponsors</h4>
          <img
            src={require("../../assets/img/logo/cinema/ebv.id.png")}
            alt="logo ebv.id"
            className="d-sm-block mb-sm-4"
          />
          <img
            src={require("../../assets/img/logo/cinema/cineOne21.png")}
            alt="logo cineone21"
            className="d-sm-block mb-sm-4"
          />
          <img
            src={require("../../assets/img/logo/cinema/hiflix.png")}
            alt="logo hiflix"
            className="d-sm-block"
          />
        </div>
        <div className="social-media-section col-lg-3 col-sm-5 mb-4">
          <h4 className="text-sm bold mb-3 mb-sm-4">Follow us</h4>
          <ul className="list-unstyled">
            <li className="link-secondary mb-0 mb-sm-3 float-start float-sm-none me-3 me-sm-0">
              <Link to="#" className="text-decoration-none link-secondary">
                <i className="bi bi-facebook me-2"></i>
                <p className="d-none d-sm-inline">Tickitz Cinema id</p>
              </Link>
            </li>
            <li className="link-secondary mb-0 mb-sm-3 float-start float-sm-none me-3 me-sm-0">
              <Link to="#" className="text-decoration-none link-secondary">
                <i className="bi bi-instagram me-2"></i>
                <p className="d-none d-sm-inline">tickitz.id</p>
              </Link>
            </li>
            <li className="link-secondary mb-0 mb-sm-3 float-start float-sm-none me-3 me-sm-0">
              <Link to="#" className="text-decoration-none link-secondary">
                <i className="bi bi-twitter me-2"></i>
                <p className="d-none d-sm-inline">tickitz.id</p>
              </Link>
            </li>
            <li className="link-secondary">
              <Link to="#" className="text-decoration-none link-secondary">
                <i className="bi bi-youtube me-2"></i>
                <p className="d-none d-sm-inline">Tickitz Cinema id</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <p className="text-center text-secondary fs-7">&copy; 2022 Tickitz. All Rights Reserved.</p>
    </footer>
  );
}

export default Footer;
