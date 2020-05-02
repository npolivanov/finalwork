export const actionTypes = {
  SET_DRAW: "SET_DRAW",
  SET_SCALE: "SET_SCALE",
};

export const appActions = {
  setDraw: (value: any) => ({ type: actionTypes.SET_DRAW, payload: value }),
  setScale: (value: any) => ({ type: actionTypes.SET_SCALE, payload: value }),
};

const initialState = {
  draw: false,
  scale: 0.8, // scale main scene
};

function controlScene(state = initialState, { type, payload }: any) {
  switch (type) {
    case actionTypes.SET_DRAW:
      return { ...state, draw: payload };
    case actionTypes.SET_SCALE:
      return { ...state, scale: payload };
    default:
      return state;
  }
}

export default controlScene;
