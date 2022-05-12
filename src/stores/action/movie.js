import axios from "../../utils/axios";

export const getDataMovieRedux = (page) => {
  return {
    type: "GET_DATA_MOVIE",
    payload: axios.get(`movie?page=${page}&limit=8`)
  };
};
