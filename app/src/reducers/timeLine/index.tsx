export const actionTypes = {
  CLICK_DONE_SHOT: "CLICK_DONE_SHOT",
  CREATE_VIDEO: "CREATE_VIDEO",
  SET_SERVER: "SET_SERVER",
  SET_SHOTS_SCREENSHOT: "SET_SHOTS_SCREENSHOT",
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
};

const initialState = {
  shots: [],
  server: "",
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
      return { ...state, server: payload };
    case actionTypes.SET_SHOTS_SCREENSHOT:
      return {
        ...state,
        shots: [...state.shots, payload],
      };
    default:
      return state;
  }
}

export default TimeLine;
