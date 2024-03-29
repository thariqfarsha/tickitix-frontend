import React from "react";
import { Link } from "react-router-dom";

function Card(props) {
  return (
    <div className="movie-card card d-inline-block text-center p-3 p-md-4 h-100">
      <div className="d-flex flex-column h-100">
        <img
          src={
            props.data.imagePath
              ? props.data.imagePath
              : "https://via.placeholder.com/300x400.png?text=+"
          }
          className="card-img-top rounded"
          style={{ aspectRatio: "2 / 3", objectFit: "cover" }}
          alt={props.data?.name}
        />
        <div className="card-body p-0 pt-3 d-flex flex-column justify-content-between">
          <div>
            <h5 className="h6 fw-semibold card-title text-wrap">
              {props.data ? props.data.name : "Movie Title"}
            </h5>
            <p className="card-text text-dark text-opacity-50 pb-3">
              {props.data ? props.data.category : "Movie Category"}
            </p>
          </div>
          {props.pathname === "/manage-movie" ? (
            <div>
              <button
                type="button"
                className="btn btn-outline-primary py-2 w-100 mb-2"
                onClick={() => props.setUpdate(props.data)}
              >
                Update
              </button>
              <button
                type="button"
                className="btn btn-outline-danger py-2 w-100"
                data-bs-toggle="modal"
                data-bs-target="#deleteModal"
                onClick={() => props.setMovieId(props.data.id)}
              >
                Delete
              </button>
            </div>
          ) : (
            <div>
              <Link to={`/detail/${props.data?.id}`} className="btn btn-outline-primary py-1 w-100">
                Details
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;
