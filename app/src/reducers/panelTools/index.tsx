import BrushCursor from "images/brush.svg";

export const actionTypes = {
  SELECT_TOOLS: "SELECT_TOOLS",
};

export const appActions = {
  selectTools: (value: any) => ({
    type: actionTypes.SELECT_TOOLS,
    payload: value,
  }),
};

const initialState = {
  tools: [
    {
      size: 3,
      selected: false,
      type: "brush",
    },
    {
      selected: false,
      type: "delete",
    },
  ],
};

function panelTools(state = initialState, { type, payload }: any) {
  switch (type) {
    case actionTypes.SELECT_TOOLS:
      let tools: any = state.tools;
      state.tools = tools.map((item: any) => {
        if (item.type === payload) {
          if (payload === "brush" && !item.selected === true) {
            (document as any).body.style.cursor = `url(${BrushCursor}), auto`;
          } else {
            (document as any).body.style.cursor = `auto`;
          }
          item.selected = !item.selected;
        } else {
          item.selected = false;
        }
        return item;
      });
      return { ...state };
    default:
      return state;
  }
}

export default panelTools;
