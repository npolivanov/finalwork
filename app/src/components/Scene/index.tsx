import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { appActions as actionPanel } from "reducers/panelTools";
import { appActions } from "reducers/controlScene";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Stage, Layer, Rect, Line, Transformer } from "react-konva";
import Konva from "konva";
import TextComponents from "./components/Text";
import LineComponents from "./components/Line";

interface IFont {
  id: number;
  font: string;
}

interface IProps {
  setFigures(obj: any): void;
  lineWidth: number;
  color: string;
  scale: number;
  currentTool: string;
  draw(): void;
  setLine(): void;
  drawLine(array: number[]): void;
  setEraser(): void;
  setText(obj: any): void;
  setFigureDraw(obj: any): void;
  figures: Array<any>;
  arrayFontSize: Array<IFont>;
  currentFontSize: number;
  currentAlign: string;
}

const Wrapper = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Card = styled.div`
  width: 1200px;
  height: 800px;
  position: absolute;
  background-color: #fff;
`;

function Scene(props: IProps) {
  const [drawScene, setDrawScene] = useState(true);

  const draw = (e: any) => {
    const canvas: any = document.getElementById("mainCanvas");
    switch (props.currentTool) {
      case "brush":
        props.setLine();
        canvas.onmousemove = (e: any) => {
          props.drawLine([e.offsetX, e.offsetY]);
        };
        break;

      case "delete":
        props.setEraser();
        canvas.onmousemove = (e: any) => {
          props.drawLine([e.offsetX, e.offsetY]);
        };
        break;
    }

    canvas.onmouseup = () => {
      canvas.onmousemove = null;
    };
  };

  const clicked = (e: any) => {
    switch (props.currentTool) {
      case "text":
        props.setText({ x: e.evt.offsetX, y: e.evt.offsetY });
        break;
      case "figure":
        props.setFigureDraw({ x: e.evt.offsetX, y: e.evt.offsetY });
        break;
    }
  };

  const onFigure = () => {
    setDrawScene(false);
    (document as any).body.style.cursor = `move`;
  };

  const offFigure = () => {
    setDrawScene(true);
    (document as any).body.style.cursor = `default`;
  };

  return (
    <Wrapper>
      <Card style={{ transform: `scale(${props.scale})` }}>
        <div id="mainCanvas">
          <Stage
            container={"mainCanvas"}
            onMouseDown={(e: any) => drawScene && draw(e)}
            onClick={(e: any) => (drawScene ? clicked(e) : setDrawScene(true))}
            width={1200}
            height={800}
          >
            <Layer>
              {props.figures.map((item: any, i: number) => {
                switch (item.type) {
                  case "Line":
                    return (
                      <Line
                        key={i}
                        points={item.array}
                        stroke={item.color}
                        draggable={true}
                        onMouseDown={() => onFigure()}
                        onMouseUp={() => offFigure()}
                        strokeWidth={item.lineWidth}
                      />
                    );
                  case "ERASER":
                    return (
                      <Line
                        key={i}
                        points={item.array}
                        stroke={"white"}
                        strokeWidth={item.lineWidth}
                      />
                    );
                  // case "TRIANGLE":
                  //   return (
                  //     <LineComponents
                  //       key={i}
                  //       x={item.x}
                  //       y={item.y}
                  //       edit={drawScene}
                  //       points={[0, 0, 100, 0, 100, 100]}
                  //       backgroundColor={item.backgroundColor}
                  //       stroke={item.color}
                  //       strokeWidth={item.lineWidth}
                  //       setDrawScene={() => setDrawScene(false)}
                  //     />
                  //   );
                  case "TEXT":
                    return (
                      <TextComponents
                        key={i}
                        edit={drawScene}
                        x={item.x}
                        y={item.y}
                        color={item.color}
                        fontFamily={item.fontFamily}
                        align={props.currentAlign}
                        fontSize={item.fontSize}
                        fontStyle={item.fontStyle}
                        text={item.text}
                        setDrawScene={() => setDrawScene(false)}
                      />
                    );

                  default:
                    return (
                      <Line
                        key={i}
                        points={item.array}
                        stroke={item.color}
                        strokeWidth={item.lineWidth}
                      />
                    );
                }
              })}
            </Layer>
          </Stage>
        </div>
      </Card>
    </Wrapper>
  );
}

const mapStateToProps = (state: any) => {
  return {
    draw: state.controlScene.draw,
    scale: state.controlScene.scale,
    color: state.panelTools.color,
    lineWidth: state.panelTools.lineWidth,
    currentTool: state.panelTools.currentTool,
    figures: state.panelTools.figures,
    currentFontSize: state.panelTools.currentFontSize,
    arrayFontSize: state.panelTools.arrayFontSize,
    currentAlign: state.panelTools.currentAlign,
  };
};

const action = {
  setDraw: appActions.setDraw,
  setFigures: actionPanel.setFigures,
  setLine: actionPanel.setLine,
  drawLine: actionPanel.drawLine,
  setEraser: actionPanel.setEraser,
  setText: actionPanel.setText,
  setFigureDraw: actionPanel.setFigureDraw,
};

export default connect(mapStateToProps, action)(Scene);
