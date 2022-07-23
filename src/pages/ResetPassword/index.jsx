import React from "react";
import { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import axios from "../../utils/axios";

export default function ResetPassword() {
  const params = useParams();
  const [queryParams] = useSearchParams();
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(3);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPwd, setShowPwd] = useState({
    newPassword: false,
    confirmPassword: false
  });
  const [formReset, setFormReset] = useState({
    id: params.id,
    otp: queryParams.get("otp"),
    newPassword: "",
    confirmPassword: ""
  });

  const isAllFormFilled = Object.keys(formReset).every((el) => formReset[el]);

  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setFormReset({ ...formReset, [name]: value });
  };

  const handleResetPassword = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const result = await axios.patch(`auth/reset-password`, formReset);
      setIsLoading(false);
      setIsError(false);
      setMessage(result.data.msg);
      setActiveStep(4);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setIsError(true);
      setMessage(error.response.data.msg);
    }
  };

  return (
    <AuthLayout withStepper={true} activeStep={activeStep}>
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
        <h1 className="h3 fw-bold">Reset Password</h1>
        <p className="text-secondary">Set your new password</p>
        <form onSubmit={handleResetPassword}>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              New Password
            </label>
            <div className="position-relative">
              <input
                type={showPwd.newPassword ? "text" : "password"}
                id="newPassword"
                name="newPassword"
                className="form-control"
                placeholder="Enter your new password"
                onChange={handleChangeForm}
                disabled={message === "OTP is not valid" || (message && !isError)}
              />
              <div
                role="button"
                className=" position-absolute me-2 top-50 end-0 translate-middle"
                onClick={() => setShowPwd({ ...showPwd, newPassword: !showPwd.newPassword })}
              >
                <i className={`bi ${showPwd.newPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
              </div>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Confirm Password
            </label>
            <div className="position-relative">
              <input
                type={showPwd.confirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                className="form-control"
                placeholder="Confirm your new password"
                onChange={handleChangeForm}
                disabled={message === "OTP is not valid" || (message && !isError)}
              />
              <div
                role="button"
                className=" position-absolute me-2 top-50 end-0 translate-middle"
                onClick={() =>
                  setShowPwd({ ...showPwd, confirmPassword: !showPwd.confirmPassword })
                }
              >
                <i className={`bi ${showPwd.confirmPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
              </div>
            </div>
          </div>
          <button
            className="btn btn-md btn-primary w-100 mt-3 mb-2"
            type="submit"
            disabled={message === "OTP is not valid" || (message && !isError) || !isAllFormFilled}
          >
            {isLoading ? (
              <div className="spinner-border spinner-border-sm text-white" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              "Reset Password"
            )}
          </button>
          <button
            type="button"
            className={`${
              message === "OTP is not valid" ? "d-block" : "d-none"
            } btn btn-outline-primary fw-semibold w-100`}
            onClick={() => navigate("/forgot-password")}
          >
            Resend email
          </button>
          <button
            type="button"
            className={`${
              message && !isError ? "d-block" : "d-none"
            } btn btn-outline-primary fw-semibold w-100`}
            onClick={() => navigate("/signin")}
          >
            Sign in
          </button>
        </form>
      </div>
    </AuthLayout>
  );
}
