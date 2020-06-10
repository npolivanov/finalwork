import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { appActions as actionPanel } from "reducers/panelTools";
import { appActions } from "reducers/controlScene";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import {
  Stage,
  Layer,
  Rect,
  Line,
  Transformer,
  Image as ImageKonva,
} from "react-konva";
import Konva from "konva";
import TextComponents from "./components/Text";
import LineComponents from "./components/Line";
import useImage from "use-image";

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
  height: 70vh;
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
  const [image] = useImage(
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALcAAAC3CAYAAABQbs+fAAAABHNCSVQICAgIfAhkiAAAABl0RVh0U29mdHdhcmUAZ25vbWUtc2NyZWVuc2hvdO8Dvz4AAAAuaVRYdENyZWF0aW9uIFRpbWUAAAAAANCS0YIgMDIg0LjRjtC9IDIwMjAgMjE6MTU6MjTbegpOAAAC1klEQVR4nO3YsU0jQRSA4RlMACJBdEAHDuiLWuiLIqiAiNBiLrjUe8md16ef75M2eskb729ptHOttQYE3Vx7AbgUcZMlbrLETdfacDwe1xgj+9zf3199B2f8++d4PG4lvObW15I553h7P50bJby+3KbPN8bPOePWBz/XErLETZa4yRI3WeImS9xkiZsscZMlbrLETZa4yRI3WeImS9xkiZsscZMlbrLETZa4yRI3WeImS9xkiZsscZMlbrLETZa4yRI3WeImS9xkiZsscZMlbrLETZa4yRI3WeImS9xkiZsscZMlbrLETZa4yRI3WeImS9xkiZsscZMlbrLETZa4yRI3WeImS9xkiZusudZa5waHw2F8f3/vvc9u5rwZa3XPN8YYc86x8XozDofDOJ1OZ2ebcc85L7rU/+Dt/fyPUvH6cnvtFXax9Qd2LSFL3GSJmyxxkyVussRNlrjJEjdZ4iZL3GSJmyxxkyVussRNlrjJEjdZ4iZL3GSJmyxxkyVussRNlrjJEjdZ4iZL3GSJmyxxkyVussRNlrjJEjdZ4iZL3GSJmyxxkyVussRNlrjJEjdZ4iZL3GSJmyxxkyVussRNlrjJEjdZ4iZL3GSJmyxxkyVussRNlrjJmmutdW7w/Pw8Pj4+dl6Hf+np6Wl8fn5ee42Lenh4GF9fX2dnm3HPOcfGKGHOee0VdlF+h2P8uVPXErLETZa4yRI3WeImS9xkiZsscZMlbrLETZa4yRI3WeImS9xkiZsscZMlbrLETZa4yRI3WeImS9xkiZsscZMlbrLETZa4yRI3WeImS9xkiZsscZMlbrLETZa4yRI3WeImS9xkiZsscZMlbrLETZa4yRI3WeImS9xkiZsscZMlbrLETZa4yRI3WeImS9xk3W4NHh8fx5xzz112Necca61rr3FRd3d36Xc4xu9Ot8xVf8P8WK4lZImbLHGTJW6yxE2WuMn6Bb2TLFRXI9YpAAAAAElFTkSuQmCC",
  );

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
              <Rect width={1200} height={800} fill="white" />
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
                  case "IMAGE":
                    var img: any = new Image();
                    img.src = item.value;
                    return (
                      <ImageKonva
                        draggable={true}
                        x={10}
                        y={10}
                        key={i}
                        image={img}
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
