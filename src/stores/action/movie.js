import axios from "../../utils/axios";

export const getDataMovieRedux = (page, limit) => {
  return {
    type: "GET_DATA_MOVIE",
    payload: axios.get(`movie?page=${page}&limit=${limit}&sort=createdAt%20desc`)
  };
};

export const postMovieRedux = (form) => {
  return {
    type: "POST_MOVIE",
    payload: axios.post("movie", form)
  };
};

export const updateMovieRedux = (id, form) => {
  return {
    type: "UPDATE_MOVIE",
    payload: axios.patch(`movie/${id}`, form)
  };
};

export const deleteMovieRedux = (id) => {
  return {
    type: "DELETE_MOVIE",
    payload: axios.delete(`movie/${id}`)
  };
};
