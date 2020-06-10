import BrushCursor from "images/brush.svg";
import EraserCursor from "images/eraser.svg";

export const actionTypes = {
  SELECT_TOOLS: "SELECT_TOOLS",
  SET_COLOR: "SET_COLOR",
  SET_WIDTH: "SET_WIDTH",
  SET_FIGURES: "SET_FIGURES",
  SET_LINE: "SET_LINE",
  DRAW_LINE: "DRAW_LINE",
  SET_ERASER: "ERASER_LINE",
  SET_TEXT: "SET_TEXT",
  SET_CURRENT_SIZE: "SET_CURRENT_SIZE",
  SET_ALIGN: "SET_ALIGN",
  SET_STYLE: "SET_STYLE",
  SET_VALUE_TEXT: "SET_VALUE_TEXT",
  SET_BACKGROUND_COLOR: "SET_BACKGROUND_COLOR",
  SET_SELECTED_FIGURE: "SET_SELECTED_FIGURE",
  SET_FIGURE_DRAW: "SET_FIGURE_DRAW",
  SET_IMAGE: "SET_IMAGE",
};

export const appActions = {
  selectTools: (value: any) => ({
    type: actionTypes.SELECT_TOOLS,
    payload: value,
  }),
  setColor: (color: string) => ({
    type: actionTypes.SET_COLOR,
    payload: color,
  }),
  setBackgroundColor: (color: string) => ({
    type: actionTypes.SET_BACKGROUND_COLOR,
    payload: color,
  }),
  setWidth: (width: number) => ({
    type: actionTypes.SET_WIDTH,
    payload: width,
  }),
  setFigures: (figure: any[]) => ({
    type: actionTypes.SET_FIGURES,
    payload: figure,
  }),
  setLine: () => ({
    type: actionTypes.SET_LINE,
  }),
  drawLine: (array: number[]) => ({
    type: actionTypes.DRAW_LINE,
    payload: array,
  }),
  setEraser: (array: number[]) => ({
    type: actionTypes.SET_ERASER,
    payload: array,
  }),
  setText: (obj: any) => ({
    type: actionTypes.SET_TEXT,
    payload: obj,
  }),
  setCurrentSize: (payload: any) => ({
    type: actionTypes.SET_CURRENT_SIZE,
    payload: payload,
  }),
  setAlign: (payload: string) => ({
    type: actionTypes.SET_ALIGN,
    payload: payload,
  }),
  setStyle: (payload: string) => ({
    type: actionTypes.SET_STYLE,
    payload: payload,
  }),
  setValueText: (payload: string) => ({
    type: actionTypes.SET_VALUE_TEXT,
    payload: payload,
  }),
  setSelectedFigure: (payload: string) => ({
    type: actionTypes.SET_SELECTED_FIGURE,
    payload: payload,
  }),
  setFigureDraw: (payload: any) => ({
    type: actionTypes.SET_FIGURE_DRAW,
    payload: payload,
  }),
  setImage: (payload: any) => ({
    type: actionTypes.SET_IMAGE,
    payload: payload,
  }),
};

const initialState = {
  color: "rgba(0, 0, 0, 1)",
  backgroundColor: "rgba(0, 0, 0, 1)",
  lineWidth: 3,
  fontFamily: "calibri",
  fontSize: 15,
  valueText: "New text",
  currentAlign: "left",
  currentTool: "brush",
  figures: [] as any,
  tools: [
    {
      size: 3,
      selected: true,
      type: "brush",
    },
    {
      selected: false,
      type: "delete",
    },
    {
      selected: false,
      type: "text",
    },
    {
      selected: false,
      type: "figure",
    },
    {
      selected: false,
      type: "fill",
    },
  ],
  selectedFigure: "triangle",
  arrayFiguresDraw: ["triangle", "square", "circle"],
  currentFontSize: 1,
  arrayFontSize: [
    { font: "Times New Roman", id: 0 },
    { font: "calibri", id: 1 },
    { font: "arial", id: 2 },
  ],
  fontStyle: "normal",
  arrayFontStyle: ["normal", "bold", "italic"],
  arrayAlign: ["left", "center", "right"],
  imageArray: [],
};

function panelTools(state = initialState, { type, payload }: any) {
  switch (type) {
    case actionTypes.SELECT_TOOLS:
      let newStateTools: any = { ...state };
      let tools: any = state.tools;
      newStateTools.currentTool = payload;
      newStateTools.tools = tools.map((item: any) => {
        if (item.type === payload) {
          if (payload === "brush" && !item.selected === true) {
            (document as any).body.style.cursor = `url(${BrushCursor}) 4 12, auto`;
          } else if (payload === "delete" && !item.selected === true) {
            (document as any).body.style.cursor = `url(${EraserCursor}) 4 12, auto`;
          } else if (payload === "text" && !item.selected === true) {
            (document as any).body.style.cursor = `text`;
          } else if (payload === "figure" && !item.selected === true) {
            (document as any).body.style.cursor = `auto`;
          } else {
            newStateTools.currentTool = "";
            (document as any).body.style.cursor = `auto`;
          }
          item.selected = !item.selected;
        } else {
          item.selected = false;
        }
        return item;
      });
      return { ...newStateTools };
    case actionTypes.SET_FIGURE_DRAW:
      let figuresDrawTriangle = [...state.figures];
      if (state.selectedFigure === "triangle") {
        figuresDrawTriangle.push({
          type: "TRIANGLE",
          color: state.color,
          backgroundColor: state.backgroundColor,
          lineWidth: state.lineWidth,
          array: [],
          x: payload.x,
          y: payload.y,
        });
      }
      return { ...state, figures: [...figuresDrawTriangle] };
    case actionTypes.SET_SELECTED_FIGURE:
      return { ...state, selectedFigure: payload };
    case actionTypes.SET_COLOR:
      return {
        ...state,
        color: payload,
      };
    case actionTypes.SET_BACKGROUND_COLOR:
      return {
        ...state,
        backgroundColor: payload,
      };
    case actionTypes.SET_WIDTH:
      return { ...state, lineWidth: payload };
    case actionTypes.SET_LINE:
      let figures = [...state.figures];
      figures.push({
        type: "Line",
        color: state.color,
        lineWidth: state.lineWidth,
        array: [],
      });
      return { ...state, figures: [...figures] };
    case actionTypes.SET_ERASER:
      let eraser = [...state.figures];
      eraser.push({
        type: "ERASER",
        color: state.color,
        lineWidth: state.lineWidth,
        array: [],
      });
      return { ...state, figures: [...eraser] };
    case actionTypes.SET_TEXT:
      let text = [...state.figures];
      text.push({
        type: "TEXT",
        color: state.color,
        fontSize: state.lineWidth,
        fontFamily: state.arrayFontSize[state.currentFontSize].font,
        text: state.valueText,
        x: payload.x,
        y: payload.y,
        fontStyle: state.fontStyle,
      });
      return { ...state, figures: [...text] };
    case actionTypes.DRAW_LINE:
      let drawLines = [...state.figures];
      drawLines[drawLines.length - 1].array = drawLines[
        drawLines.length - 1
      ].array.concat(payload);
      return { ...state, figures: [...drawLines] };
    case actionTypes.SET_CURRENT_SIZE:
      return { ...state, currentFontSize: payload };
    case actionTypes.SET_ALIGN:
      return { ...state, currentAlign: payload };
    case actionTypes.SET_VALUE_TEXT:
      return { ...state, valueText: payload };
    case actionTypes.SET_STYLE:
      return { ...state, fontStyle: payload };
    case actionTypes.SET_IMAGE:
      return { ...state, figures: [...state.figures, payload] };
    default:
      return state;
  }
}

export default panelTools;
