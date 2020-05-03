import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { appActions } from "reducers/panelTools";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import BrushOutlinedIcon from "@material-ui/icons/BrushOutlined";
import TextFieldsIcon from "@material-ui/icons/TextFields";

const Wrapper = styled.div`
  width: 5%;
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
