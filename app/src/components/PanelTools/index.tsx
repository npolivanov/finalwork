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
import ImageIcon from "@material-ui/icons/Image";

const Wrapper = styled.div`
  width: 5%;
  height: 70vh;
  position: fixed;
  z-index: 999;
  background-color: #262c34;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  flex-direction: column;
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
  }
}

function PanelTools(props: any) {
  return (
    <Wrapper>
      <Container>
        {props.tools.map((item: any, i: number) => (
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
            onClick={() => props.selectTools(item.type)}
            key={i}
          >
            {returnTool({ type: item.type, selected: item.selected })}
          </IconButton>
        ))}
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
};

export default connect(mapStateToProps, action)(PanelTools);
