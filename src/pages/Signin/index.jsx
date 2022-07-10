import React, { useState } from "react";
import axios from "../../utils/axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../stores/action/user";

function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const { isLoading } = useSelector((state) => state.user);

  const handleChangeForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      setIsLoggingIn(true);
      const resultLogin = await axios.post("auth/login", form).then(setIsLoggingIn(false));
      localStorage.setItem("token", resultLogin.data.data.token);
      localStorage.setItem("refreshToken", resultLogin.data.data.refreshToken);
      await dispatch(getUserById(resultLogin.data.data.id));
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
          <span className="d-block h2 text-light">wait, watch, wow!</span>
        </div>
        <div className="signin-form col-md-5 pt-5 pt-md-0 d-md-flex justify-content-center align-items-center">
          <div className="container px-4 px-md-5">
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
                {isLoggingIn || isLoading ? (
                  <div className="spinner-border spinner-border-sm text-white" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  "Sign in"
                )}
              </button>
            </form>
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
