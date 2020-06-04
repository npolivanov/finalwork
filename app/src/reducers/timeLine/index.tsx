export const actionTypes = {
  CLICK_DONE_SHOT: "CLICK_DONE_SHOT",
  CREATE_VIDEO: "CREATE_VIDEO",
  SET_SERVER: "SET_SERVER",
  SET_SHOTS_SCREENSHOT: "SET_SHOTS_SCREENSHOT",
  DELETE_VIDEO: "DELETE_VIDEO",
};

export const appActions = {
  clickDoneShot: (value: any) => ({
    type: actionTypes.CLICK_DONE_SHOT,
    payload: value,
  }),
  createVideo: () => ({
    type: actionTypes.CREATE_VIDEO,
  }),
  setServer: (payload: string) => ({
    type: actionTypes.SET_SERVER,
    payload: payload,
  }),
  setShotsScreenshot: (payload: string) => ({
    type: actionTypes.SET_SHOTS_SCREENSHOT,
    payload: payload,
  }),
  deleteVideo: () => ({
    type: actionTypes.DELETE_VIDEO,
  }),
};

const initialState = {
  shots: localStorage.getItem("shots")
    ? JSON.parse(localStorage.getItem("shots") || "[]")
    : [],
  server: localStorage.getItem("server") ? localStorage.getItem("server") : "",
};

function TimeLine(state = initialState, { type, payload }: any) {
  switch (type) {
    case actionTypes.CLICK_DONE_SHOT:
      return {
        ...state,
      };
    case actionTypes.CREATE_VIDEO:
      return { ...state };
    case actionTypes.SET_SERVER:
      localStorage.setItem("server", payload);
      return { ...state, server: payload };
    case actionTypes.SET_SHOTS_SCREENSHOT:
      localStorage.setItem("shots", JSON.stringify([...state.shots, payload]));
      return {
        ...state,
        shots: [...state.shots, payload],
      };
    case actionTypes.DELETE_VIDEO:
      localStorage.removeItem("shots");
      return { ...state, shots: [] };
    default:
      return state;
  }
}

export default TimeLine;
