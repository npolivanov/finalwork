import React, { useState, useEffect } from "react";
import { Line, Transformer } from "react-konva";

interface IProps {
  x: number;
  y: number;
  edit: boolean;
  color: string;
  backgroundColor:string;
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
        fill={props.backgroundColor}
        ref={textRef}
        closed
        points={props.points}
        draggable={true}
        onClick={() => selectText()}
      />
      <Transformer ref={trRef} />
    </React.Fragment>
  );
};
