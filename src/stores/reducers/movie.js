const initialState = {
  data: [],
  pageInfo: {},
  isLoading: false,
  isError: false,
  msg: ""
};

const movie = (state = initialState, action) => {
  switch (action.type) {
    case "GET_DATA_MOVIE_PENDING": {
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    }
    case "GET_DATA_MOVIE_FULFILLED": {
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data,
        pageInfo: action.payload.data.pagination,
        msg: action.payload.data.msg
      };
    }
    case "GET_DATA_MOVIE_REJECTED": {
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: [],
        pageInfo: {},
        msg: action.payload.response.data.msg
      };
    }
    default: {
      return state;
    }
  }
};

export default movie;
