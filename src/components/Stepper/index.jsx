import React from "react";

export default function Stepper({ activeStep }) {
  const steps = [
    {
      number: 1,
      content: "Fill your complete email"
    },
    {
      number: 2,
      content: "Check your email"
    },
    {
      number: 3,
      content: "Enter your new password"
    },
    {
      number: 4,
      content: "Done"
    }
  ];

  return (
    <>
      {steps.map((step) => (
        <div key={step.number}>
          <div className="d-flex align-items-center">
            <div
              className={`rounded-circle border d-flex justify-content-center align-items-center ${
                activeStep === step.number ? "bg-white text-primary" : "text-white"
              }`}
              style={{ height: 32, width: 32 }}
            >
              {step.number}
            </div>
            <p
              className={`text-white mb-0 ms-4 ${
                activeStep === step.number ? "opacity-100 fw-bold" : "opacity-75"
              }`}
            >
              {step.content}
            </p>
          </div>
          {step.number < steps.length && (
            <div className="d-flex justify-content-center" style={{ width: 32 }}>
              <div className="vr text-white" style={{ opacity: 0.75, height: 20 }}></div>
            </div>
          )}
        </div>
      ))}
    </>
  );
}
