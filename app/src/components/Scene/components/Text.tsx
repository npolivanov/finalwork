import React, { useState, useEffect } from "react";
import { Text, Transformer } from "react-konva";

interface IProps {
  x: number;
  y: number;
  text: string;
  edit: boolean;
  color: string;
  fontSize: number;
  fontStyle: string;
  fontFamily: string;
  align: string;
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
    }
  }, [isSelected]);

  useEffect(() => {
    setIsSelected(false);
  }, [props.edit]);

  const selectText = () => {
    setIsSelected(true);
    props.setDrawScene();
  };

  return (
    <React.Fragment>
      <Text
        x={props.x}
        y={props.y}
        align={props.align}
        fill={props.color}
        ref={textRef}
        fontFamily={props.fontFamily}
        fontSize={props.fontSize}
        fontStyle={props.fontStyle}
        text={props.text}
        draggable={true}
        onClick={() => selectText()}
      />
      <Transformer ref={trRef} />
    </React.Fragment>
  );
};
