import React from "react";
import { useNavigate } from "react-router-dom";

export default function Unauthorized() {
  const navigate = useNavigate();
  return (
    <div>
      Unauthorized
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </button>
    </div>
  );
}
