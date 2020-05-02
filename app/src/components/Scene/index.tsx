import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { appActions } from "reducers/controlScene";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Stage, Layer, Rect, Text, Line } from "react-konva";
import Konva from "konva";

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

function Scene(props: any) {
  return (
    <Wrapper>
      <Card style={{ transform: `scale(${props.scale})` }}>
        <div id="mainCanvas">
          <Stage container={"mainCanvas"} width={1200} height={800}>
            {/* <Layer>
              <Line
                points={[5, 70, 140, 23, 250, 60, 300, 20]}
                strokeWidth={15}
                stroke="black"
                lineCap={"round"}
              />
            </Layer> */}
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
  };
};

const action = {
  setDraw: appActions.setDraw,
};

export default connect(mapStateToProps, action)(Scene);
