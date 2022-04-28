import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../utils/axios";

function SignUp() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    noTelp: "",
    email: "",
    password: ""
  });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChangeForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const resultSignup = await axios.post("auth/register", form);

      setIsError(false);
      setMessage(resultSignup.data.msg);
    } catch (error) {
      setIsError(true);
      setMessage(error.response.data.msg);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row vh-100">
        <div className="signin-banner col-md-7 d-none d-md-flex flex-column justify-content-center align-items-center">
          <img
            src={require("../../assets/img/logo/logo-white-lg.png")}
            alt="logo tickitz"
            width="40%"
          />
          <span className="d-block h2 text-light">wait, watch, wow!</span>
        </div>
        <div className="signin-form col-md-5 pt-5 pt-md-0 d-md-flex justify-content-center align-items-center">
          <div className="container px-4 px-md-5 py-4 py-md-5">
            <div className="d-md-none text-center mb-5">
              <img src={require("../../assets/img/logo/logo-nav.png")} alt="logo tickitz" />
            </div>
            {!message ? null : isError ? (
              <div className="alert alert-danger py-2" role="alert">
                {message}
              </div>
            ) : (
              <div className="alert alert-success py-2" role="alert">
                {message}
              </div>
            )}
            <h1 className="display-6 fw-bold">Sign up</h1>
            <p className="text-secondary">Fill your additional details</p>
            <form onSubmit={handleSubmit}>
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
                  onChange={handleChangeForm}
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
                  onChange={handleChangeForm}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="phoneNumber" className="form-label">
                  Phone Number
                </label>
                <input
                  type="tel"
                  minLength="11"
                  maxLength="13"
                  id="phoneNumber"
                  className="form-control"
                  placeholder="08XXXXXXXXXX"
                  name="phoneNumber"
                  onChange={handleChangeForm}
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
                  onChange={handleChangeForm}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  placeholder="Enter your password"
                  name="password"
                  onChange={handleChangeForm}
                />
              </div>
              <button className="btn btn-md btn-primary w-100 mt-3 mb-4" type="submit">
                Sign up
              </button>
            </form>
            <span className="d-block text-xs text-center color-body">
              Already had account?
              <Link to="/signin" className="link-primary text-decoration-none">
                {" "}
                Sign in
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
