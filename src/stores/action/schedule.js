import axios from "../../utils/axios";

export const getDataScheduleRedux = (movieId, page, limit) => {
  return {
    type: "GET_DATA_SCHEDULE",
    payload: axios.get(
      `schedule?movieId=${movieId}&page=${page}&limit=${limit}&sort=createdAt%20desc`
    )
  };
};

export const postScheduleRedux = (form) => {
  return {
    type: "POST_SCHEDULE",
    payload: axios.post("schedule", form)
  };
};

export const updateScheduleRedux = (id, form) => {
  return {
    type: "UPDATE_SCHEDULE",
    payload: axios.patch(`schedule/${id}`, form)
  };
};

export const deleteScheduleRedux = (id) => {
  return {
    type: "DELETE_SCHEDULE",
    payload: axios.delete(`schedule/${id}`)
  };
};
