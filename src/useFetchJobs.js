import { useReducer, useEffect } from "react";
import axios from "axios";

const ACTIONS = {
  MAKE_REQUEST: "make_request",
  GET_DATA: "get_data",
  ERROR: "error",
};

const BASE_URL =
  "https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json";

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.MAKE_REQUEST:
      return { loading: true, jobs: [] };
    case ACTIONS.GET_DATA:
      return { ...state, loading: false, jobs: action.payload.jobs };
    case ACTIONS.ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        jobs: [],
      };
    default:
      return state;
  }
}

export default function useFecthJobs(params, page) {
  const [state, dispath] = useReducer(reducer, { jobs: [], loading: false });

  useEffect(() => {
    dispath({ type: ACTIONS.MAKE_REQUEST });
    axios
      .get(BASE_URL, {
        params: {
          markdown: true,
          page: page,
          ...params,
        },
      })
      .then((res) => {
        dispath({ type: ACTIONS.GET_DATA, payload: { jobs: res.data } });
      })
      .catch((error) => {
        dispath({ type: ACTIONS.ERROR, payload: { error: error } });
      });
  }, [params, page]);

  return state;
}
