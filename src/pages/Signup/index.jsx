import React from "react";
import { Link } from "react-router-dom";

function SignUp() {
  return (
    <div className="container-fluid">
      <div className="row vh-100">
        <div className="signin-banner col-md-7 d-none d-md-flex flex-column justify-content-center align-items-center">
          <img
            src={require("../../assets/img/logo/logo-white-lg.png")}
            alt="logo tickitz"
            width="40%"
          />
          <span className="d-block display-sm text-light">wait, watch, wow!</span>
        </div>
        <div className="signin-form col-md-5 pt-5 pt-md-0 d-md-flex justify-content-center align-items-center">
          <div className="container px-4 px-md-5 py-4 py-md-5">
            <div className="d-md-none text-center mb-5">
              <img src={require("../../assets/img/logo/logo-nav.png")} alt="logo tickitz" />
            </div>
            <h1 className="display-md bold">Sign up</h1>
            <p className="text-sm color-body">Fill your additional details</p>
            <form>
              <div className="mb-3">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  className="form-control"
                  placeholder="Enter your First Name"
                  name="firstName"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  className="form-control"
                  placeholder="Enter your Last Name"
                  name="lastName"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="phoneNumber" className="form-label">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  className="form-control"
                  placeholder="08XXXXXXXXXX"
                  name="phoneNumber"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="Enter your email"
                  name="email"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <div className="input-group">
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    placeholder="Enter your password"
                    name="password"
                  />
                  <i className="bi bi-eye color-body input-group-text px-3" id="togglePassword"></i>
                </div>
              </div>
              <button className="btn btn-md btn-primary w-100 mt-3 mb-4" type="submit">
                Sign up
              </button>
              <span className="d-block text-xs text-center color-body">
                Already had account?
                <Link to="/signin" className="link-primary text-decoration-none">
                  {" "}
                  Sign in
                </Link>
              </span>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
