import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

export default function Unauthorized() {
  const navigate = useNavigate();
  return (
    <div>
      <Navbar />

      <main className="bg-primary-light pb-4 vh-100 d-flex align-items-center">
        <div className="container-lg text-center mb-5">
          <h1 className="display-1 fw-bold text-center">401</h1>
          <p className="h2 fw-semibold mb-5 text-center">Your request is unauthorized</p>
          <button
            className="btn btn-primary fw-semibold"
            onClick={() => {
              navigate("/");
            }}
          >
            Back to Home
          </button>
        </div>
      </main>
    </div>
  );
}
