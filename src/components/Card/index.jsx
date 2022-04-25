import React from "react";
import { Link } from "react-router-dom";

function Card() {
  return (
    <div className="card d-inline-block text-center p-3 p-md-4">
      <img
        src={require("../../assets/img/movie/thumb/spiderman-thumb.png")}
        className="card-img-top"
        alt="spiderman"
      />
      <div className="card-body p-0 pt-3">
        <h5 className="card-title">Movie Title</h5>
        <p className="card-text text-dark text-opacity-50 pb-3">Category</p>
        <Link to="#" className="btn btn-outline-primary py-1 w-100">
          Details
        </Link>
      </div>
    </div>
  );
}

export default Card;
