export const actionTypes = {
  CLICK_DONE_SHOT: "CLICK_DONE_SHOT",
  CREATE_VIDEO: "CREATE_VIDEO",
};

export const appActions = {
  clickDoneShot: (value: any) => ({
    type: actionTypes.CLICK_DONE_SHOT,
    payload: value,
  }),
  createVideo: () => ({
    type: actionTypes.CREATE_VIDEO,
  }),
};

const initialState = {
  shots: [],
};

function TimeLine(state = initialState, { type, payload }: any) {
  switch (type) {
    case actionTypes.CLICK_DONE_SHOT:
      return { ...state };
    case actionTypes.CREATE_VIDEO:
      return { ...state };
    default:
      return state;
  }
}

export default TimeLine;
