import React from "react";
import Stepper from "../components/Stepper";

export default function AuthLayout({ withStepper, activeStep, children }) {
  withStepper = withStepper || false;

  return (
    <div className="container-fluid vh-100 bg-primary" style={{ "--bs-bg-opacity": 0.05 }}>
      <div className="container-lg p-0 p-md-4 h-100">
        <div className="row h-100 shadow">
          {withStepper ? (
            <div className="auth-banner h-100 col-md-7 p-5 d-none d-md-flex flex-column justify-content-center align-items-start">
              <img
                src={require("../assets/img/logo/logo-white-lg.png")}
                alt="logo tickitz"
                width="30%"
                className="mb-5"
              />
              <div className="mb-5">
                <h1 className="h2 fw-bold text-white mb-3">Reset your password</h1>
                <p className="text-white">
                  To be able to use your account again, please complete the following steps.
                </p>
              </div>
              <Stepper activeStep={activeStep} />
            </div>
          ) : (
            <div className="auth-banner h-100 col-md-7 d-none d-md-flex flex-column justify-content-center align-items-center">
              <img
                src={require("../assets/img/logo/logo-white-lg.png")}
                alt="logo tickitz"
                width="40%"
              />
              <span className="d-block h2 text-light">wait, watch, wow!</span>
            </div>
          )}
          <div className="col-md-5 bg-white h-100 py-5 d-md-flex justify-content-center align-items-center">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
