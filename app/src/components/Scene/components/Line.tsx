import React, { useState, useEffect } from "react";
import { Line, Transformer } from "react-konva";

interface IProps {
  x: number;
  y: number;
  edit: boolean;
  color: string;
  fontSize: number;
  fontStyle: string;
  fontFamily: string;
  align: string;
  points: Array<number>;
  setDrawScene(): void;
}

export default (props: IProps) => {
  const textRef: any = React.useRef();
  const trRef: any = React.useRef();
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    console.log("props.color");
    console.log(props.color);
  }, []);

  useEffect(() => {
    if (isSelected === true) {
      trRef.current.setNode(textRef.current);
      trRef.current.getLayer().batchDraw();
    } else {
      console.log("no");
    }
  }, [isSelected]);

  const selectText = () => {
    console.log("select text");
    setIsSelected(!isSelected);
    props.setDrawScene();
  };

  return (
    <React.Fragment>
      <Line
        x={props.x}
        y={props.y}
        align={props.align}
        fill={props.color}
        ref={textRef}
        closed
        fontFamily={props.fontFamily}
        fontSize={props.fontSize}
        fontStyle={props.fontStyle}
        points={props.points}
        draggable={true}
        onClick={() => selectText()}
      />
      <Transformer ref={trRef} />
    </React.Fragment>
  );
};
