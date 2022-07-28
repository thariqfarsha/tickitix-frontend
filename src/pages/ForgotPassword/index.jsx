import React, { useState } from "react";
import AuthLayout from "../../layouts/AuthLayout";
import axios from "../../utils/axios";

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [formEmail, setFormEmail] = useState("");

  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setFormEmail({ ...formEmail, [name]: value });
  };

  const handleSendEmail = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const result = await axios.post("/auth/forgot-password", formEmail);
      setIsLoading(false);
      setIsError(false);
      setMessage(result.data.msg);
      setActiveStep(2);
    } catch (error) {
      console.log(error);
      setIsError(true);
      setMessage(error.response.data.msg);
    }
  };

  const handleResendEmail = () => {
    setMessage("");
    setIsError(false);
  };

  return (
    <AuthLayout withStepper activeStep={activeStep}>
      <div className="container px-4 px-lg-5">
        <div className="d-md-none text-center mb-5">
          <img src={require("../../assets/img/logo/logo-color.png")} alt="logo tickitz" />
        </div>
        {!message ? (
          <div>
            <div className="mb-4">
              <h2 className="h3 fw-bold">Fill your complete email</h2>
              <p className="text-secondary">we'll send a link to your email shortly</p>
            </div>
            <form onSubmit={handleSendEmail}>
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
              <button className="btn btn-primary w-100 mt-3 mb-4" type="submit">
                {isLoading ? (
                  <div className="spinner-border spinner-border-sm text-white" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  "Send email"
                )}
              </button>
            </form>
          </div>
        ) : isError ? (
          <div>
            <h2 className="h3 fw-bold mb-4">
              <i className="bi bi-send-x-fill text-danger me-3"></i>Failed to send email
            </h2>
            <p className="mb-0 opacity-75 mb-5">{message}</p>
            <button
              className="btn btn-primary w-100 mt-3 mb-4"
              type="button"
              onClick={handleResendEmail}
            >
              Resend email
            </button>
          </div>
        ) : (
          <div>
            <h2 className="h3 fw-bold mb-4">
              <i className="bi bi-send-check-fill text-success me-3"></i>Email sent!
            </h2>
            <p className="mb-0 opacity-75">{message}</p>
          </div>
        )}
      </div>
    </AuthLayout>
  );
}
