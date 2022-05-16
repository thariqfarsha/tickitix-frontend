import React from "react";
import { Link } from "react-router-dom";

function Card(props) {
  return (
    <div className="movie-card card d-inline-block text-center p-3 p-md-4 h-100">
      <img
        src={props.data ? props.data.imagePath : "https://via.placeholder.com/300x400.png?text=+"}
        className="card-img-top rounded"
        alt={props.data ? props.data.name : ""}
      />
      <div className="card-body p-0 pt-3">
        <h5 className="h6 fw-semibold card-title text-wrap">
          {props.data ? props.data.name : "Movie Title"}
        </h5>
        <p className="card-text text-dark text-opacity-50 pb-3">
          {props.data ? props.data.category : "Movie Category"}
        </p>
        {props.pathname === "/manage-movie" ? (
          <div>
            <button
              className="btn btn-outline-primary py-2 w-100 mb-3"
              onClick={() => props.setUpdate(props.data)}
            >
              Update
            </button>
            <button
              className="btn btn-outline-danger py-2 w-100"
              onClick={() => props.handleDelete(props.data.id)}
            >
              Delete
            </button>
          </div>
        ) : (
          <Link
            to={`/detail/${props.data ? props.data.id : ""}`}
            className="btn btn-outline-primary py-1 w-100"
          >
            Details
          </Link>
        )}
      </div>
    </div>
  );
}

export default Card;
