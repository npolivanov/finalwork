import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { appActions } from "reducers/panelTools";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import BrushOutlinedIcon from "@material-ui/icons/BrushOutlined";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import PermDataSettingIcon from "@material-ui/icons/PermDataSetting";

const Wrapper = styled.div`
  width: 3%;
  height: 80vh;
  position: fixed;
  z-index: 999;
  background: #dddddd;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

function returnTool(props: any) {
  switch (props.type) {
    case "brush":
      return (
        <BrushOutlinedIcon
          fontSize="small"
          style={{ color: props.selected ? "black" : "grey" }}
        />
      );
    case "delete":
      return (
        <EditIcon
          fontSize="small"
          style={{ color: props.selected ? "black" : "grey" }}
        />
      );
    case "text":
      return (
        <TextFieldsIcon
          fontSize="small"
          style={{ color: props.selected ? "black" : "grey" }}
        />
      );
    case "figure":
      return (
        <PermDataSettingIcon
          fontSize="small"
          style={{ color: props.selected ? "black" : "grey" }}
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
