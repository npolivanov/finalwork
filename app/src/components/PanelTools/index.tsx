import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { appActions } from "reducers/panelTools";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import BrushOutlinedIcon from "@material-ui/icons/BrushOutlined";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import PermDataSettingIcon from "@material-ui/icons/PermDataSetting";
import FormatColorFillIcon from "@material-ui/icons/FormatColorFill";
import AudiotrackIcon from "@material-ui/icons/Audiotrack";
import ImageIcon from "@material-ui/icons/Image";
import PanToolIcon from "@material-ui/icons/PanTool";

const Wrapper = styled.div`
  width: 5%;
  height: 70vh;
  position: fixed;
  z-index: 999;
  background-color: #dddddd;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  flex-direction: column;
`;

const Input = styled.input`
  opacity: 0;
  position: absolute;
  cursor: pointer;
`;

function returnTool(props: any) {
  switch (props.type) {
    case "brush":
      return (
        <BrushOutlinedIcon
          fontSize="small"
          style={{ color: props.selected ? "#0db20a" : "grey" }}
        />
      );
    case "delete":
      return (
        <EditIcon
          fontSize="small"
          style={{ color: props.selected ? "#0db20a" : "grey" }}
        />
      );
    case "text":
      return (
        <TextFieldsIcon
          fontSize="small"
          style={{ color: props.selected ? "#0db20a" : "grey" }}
        />
      );
    case "figure":
      return (
        <PermDataSettingIcon
          fontSize="small"
          style={{ color: props.selected ? "#0db20a" : "grey" }}
        />
      );
    case "fill":
      return (
        <FormatColorFillIcon
          fontSize="small"
          style={{ color: props.selected ? "#0db20a" : "grey" }}
        />
      );
    case "handle":
      return (
        <PanToolIcon
          fontSize="small"
          style={{ color: props.selected ? "#0db20a" : "grey" }}
        />
      );
  }
}

function PanelTools(props: any) {
  const imageInput = React.useRef<any>(null);
  const audioInput = React.useRef<any>(null);

  const changeImage = (e: any) => {
    if (imageInput !== null) {
      var reader = new FileReader();
      reader.readAsDataURL(imageInput.current.files[0]);

      reader.onload = (event: any) => {
        props.setImage({
          value: event.target.result,
          type: "IMAGE",
        });
      };
    }
  };

  const changeAudio = (e: any) => {
    if (audioInput !== null) {
      var reader = new FileReader();
      reader.readAsDataURL(audioInput.current.files[0]);

      reader.onload = (event: any) => {
        console.log(event.target.result);
        props.setSong(event.target.result);
      };
    }
  };

  return (
    <Wrapper>
      <Container>
        {props.tools.map((item: any, i: number) => (
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
            style={{ height: "25px", width: "25px", margin: "auto" }}
            onClick={() => props.selectTools(item.type)}
            key={i}
          >
            {returnTool({ type: item.type, selected: item.selected })}
          </IconButton>
        ))}

        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
          style={{
            height: "25px",
            width: "25px",
            margin: "auto",
            position: "relative",
            cursor: "pointer",
          }}

          // onClick={() => textInput !== null && textInput.current}
          // key={i}
        >
          <Input
            type="file"
            onChange={(e: any) => changeImage(e)}
            name="image"
            multiple
            accept="image/png"
            ref={imageInput}
          />
          <ImageIcon />
        </IconButton>
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
          style={{
            height: "25px",
            width: "25px",
            margin: "auto",
            position: "relative",
            cursor: "pointer",
          }}

          // onClick={() => textInput !== null && textInput.current}
          // key={i}
        >
          <Input
            type="file"
            onChange={(e: any) => changeAudio(e)}
            name="audio"
            multiple
            accept=".mp3,audio/"
            ref={audioInput}
          />
          <AudiotrackIcon />
        </IconButton>
      </Container>
    </Wrapper>
  );
}

const mapStateToProps = (state: any) => {
  return {
    tools: state.panelTools.tools,
  };
};

const action = {
  selectTools: appActions.selectTools,
  setImage: appActions.setImage,
  setSong: appActions.setSong,
};

export default connect(mapStateToProps, action)(PanelTools);
