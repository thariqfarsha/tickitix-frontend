export const createDataBooking = (data) => {
  return {
    type: "CREATE_DATA_BOOKING",
    data: data
  };
};

export const updateDataBooking = (data) => {
  return {
    type: "UPDATE_DATA_BOOKING",
    data: data
  };
};
