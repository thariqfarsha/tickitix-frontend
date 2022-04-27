import React, { useState } from "react";
import axios from "../../utils/axios";
import { Link, useNavigate } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
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

      const resultLogin = await axios.post("auth/login", form);
      localStorage.setItem("token", resultLogin.data.data.token);
      localStorage.setItem("refreshToken", resultLogin.data.data.refreshToken);

      const resultUser = await axios.get(`user/${resultLogin.data.data.id}`);
      console.log(resultUser);
      localStorage.setItem("dataUser", JSON.stringify(resultUser.data.data[0]));

      setIsError(false);
      setMessage(resultLogin.data.msg);
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      console.log(error.response);
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
          <span className="d-block display-sm text-light">wait, watch, wow!</span>
        </div>
        <div className="signin-form col-md-5 pt-5 pt-md-0 d-md-flex justify-content-center align-items-center">
          <div className="container px-4 px-md-5">
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
            <h1 className="display-6 fw-bold">Sign in</h1>
            <p className="text-secondary">
              Sign in with your data that you entered during your registration
            </p>
            <form onSubmit={handleSubmit}>
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
                <div className="input-group">
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    placeholder="Enter your password"
                    name="password"
                    onChange={handleChangeForm}
                  />
                  <i className="bi bi-eye color-body input-group-text px-3" id="togglePassword"></i>
                </div>
              </div>
              <button className="btn btn-md btn-primary w-100 mt-3 mb-4" type="submit">
                Sign in
              </button>
              <span className="d-block text-xs text-center color-body mb-1">
                Forgot your password?
                <Link to="#" className="link-primary text-decoration-none">
                  {" "}
                  Reset now
                </Link>
              </span>
              <span className="d-block text-xs text-center color-body">
                Don't have an account?
                <Link to="/signup" className="link-primary text-decoration-none">
                  {" "}
                  Sign up
                </Link>
              </span>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
