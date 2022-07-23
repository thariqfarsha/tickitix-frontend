import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
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
  const [showPwd, setShowPwd] = useState(false);

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
    <AuthLayout withStepper={false}>
      <div className="container px-4 px-md-5 overflow-auto h-100">
        <div className="d-md-none text-center mb-5">
          <img src={require("../../assets/img/logo/logo-color.png")} alt="logo tickitz" />
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
            <div className="position-relative">
              <input
                type={showPwd ? "text" : "password"}
                id="password"
                className="form-control"
                placeholder="Enter your password"
                name="password"
                onChange={handleChangeForm}
              />
              <div
                role="button"
                className=" position-absolute me-2 top-50 end-0 translate-middle"
                onClick={() => setShowPwd(!showPwd)}
              >
                <i className={`bi ${showPwd ? "bi-eye-slash" : "bi-eye"}`}></i>
              </div>
            </div>
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
    </AuthLayout>
  );
}

export default SignUp;
