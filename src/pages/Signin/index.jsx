import React, { useState } from "react";
import axios from "../../utils/axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../stores/action/user";
import AuthLayout from "../../layouts/AuthLayout";

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
  const [showPwd, setShowPwd] = useState(false);

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
    <AuthLayout withStepper={false}>
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
          <Link to="/forgot-password" className="link-primary text-decoration-none">
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
    </AuthLayout>
  );
}

export default SignIn;
