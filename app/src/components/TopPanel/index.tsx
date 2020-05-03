import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { appActions } from "reducers/panelTools";
import { ChromePicker } from "react-color";
import FormatAlignLeftIcon from "@material-ui/icons/FormatAlignLeft";
import FormatAlignRightIcon from "@material-ui/icons/FormatAlignRight";
import FormatAlignCenterIcon from "@material-ui/icons/FormatAlignCenter";
import FormatBoldIcon from "@material-ui/icons/FormatBold";
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";
import FormatItalicIcon from "@material-ui/icons/FormatItalic";

import {
  TextField,
  Button,
  NativeSelect,
  FormControl,
  InputLabel,
  ButtonGroup,
} from "@material-ui/core";

interface IFont {
  id: number;
  font: string;
}

interface IProps {
  color: string;
  lineWidth: number;
  currentTool: string;
  arrayFontSize: Array<IFont>;
  currentFontSize: number;
  arrayAlign: Array<string>;
  currentAlign: string;
  valueText: string;
  arrayFontStyle: Array<string>;
  fontStyle: string;
  setColor(color: any): void;
  setWidth(width: number): void;
  setCurrentSize(payload: any): void;
  setAlign(payload: string): void;
  setValueText(payload: string): void;
  setStyle(payload: string): void;
}

interface IColorDispalay {
  color: string;
}

const Wrapper = styled.div`
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  background-color: #dddddd;
  z-index: 9999;
  position: relative;
`;

const ColorPickerOverlay = styled.div`
  position: relative;
`;

const ColorPicker = styled.div`
  position: absolute;
  z-index: 9999;
  top: 0px;
`;

const ColorDisplay = styled.div`
  background: ${(props: IColorDispalay) => props.color};
  width: 20px;
  height: 20px;
  margin-left: 10px;
`;

const TextFieldGroup = styled.div`
  display: flex;
  margin-left: 60px;
`;

const TextGroup = styled.div`
  display: flex;
  align-items: center;
`;

const TopPanel = (props: IProps) => {
  const [displayColorPicker, setDisplayColorPicker] = useState<boolean>(false);

  return (
    <Wrapper>
      <Button onClick={() => setDisplayColorPicker(!displayColorPicker)}>
        Color <ColorDisplay color={props.color}></ColorDisplay>
      </Button>
      {displayColorPicker && (
        <ColorPickerOverlay>
          <ColorPicker>
            <ChromePicker
              color={props.color}
              onChange={(ev: any) => {
                const { r, g, b, a } = ev.rgb;
                props.setColor(`rgba(${r}, ${g}, ${b}, ${a})`);
              }}
            />
          </ColorPicker>
        </ColorPickerOverlay>
      )}
      <TextFieldGroup>
        <TextField
          label={props.currentTool === "text" ? "FZ" : "WL"}
          style={{ width: "45px" }}
          type="number"
          value={props.lineWidth}
          onChange={(e: any) =>
            e.target.value > 0 && props.setWidth(e.target.value)
          }
        />
        {props.currentTool === "text" && (
          <TextGroup>
            <TextField
              label={"Text"}
              type="text"
              value={props.valueText}
              style={{ marginLeft: "20px" }}
              onChange={(e: any) => props.setValueText(e.target.value)}
            />
            <FormControl>
              <InputLabel htmlFor="filled-age-native-simple">
                fontFamily
              </InputLabel>
              <NativeSelect
                value={props.currentFontSize}
                onChange={(
                  event: React.ChangeEvent<{ name?: string; value: unknown }>,
                ) => props.setCurrentSize(event.target.value)}
                style={{ marginLeft: "20px" }}
                inputProps={{
                  name: "fontFamily",
                  id: "filled-age-native-simple",
                }}
              >
                {props.arrayFontSize.map((item: IFont) => (
                  <option value={item.id}>{item.font}</option>
                ))}
              </NativeSelect>
            </FormControl>
            <FormControl style={{ marginLeft: "20px" }}>
              <ButtonGroup size="small">
                {props.arrayAlign.map((item) => {
                  switch (item) {
                    case "left":
                      return (
                        <Button
                          style={{
                            background:
                              props.currentAlign === item ? "#ccc" : "none",
                          }}
                          onClick={() => props.setAlign(item)}
                        >
                          <FormatAlignLeftIcon />
                        </Button>
                      );
                    case "center":
                      return (
                        <Button
                          style={{
                            background:
                              props.currentAlign === item ? "#ccc" : "none",
                          }}
                          onClick={() => props.setAlign(item)}
                        >
                          <FormatAlignCenterIcon />
                        </Button>
                      );
                    case "right":
                      return (
                        <Button
                          style={{
                            background:
                              props.currentAlign === item ? "#ccc" : "none",
                          }}
                          onClick={() => props.setAlign(item)}
                        >
                          <FormatAlignRightIcon />
                        </Button>
                      );
                  }
                })}
              </ButtonGroup>
            </FormControl>
            <FormControl style={{ marginLeft: "20px" }}>
              <ButtonGroup size="small">
                {props.arrayFontStyle.map((item) => {
                  switch (item) {
                    case "normal":
                      return (
                        <Button
                          style={{
                            background:
                              props.fontStyle === item ? "#ccc" : "none",
                          }}
                          onClick={() => props.setStyle(item)}
                        >
                          <IndeterminateCheckBoxIcon />
                        </Button>
                      );
                    case "bold":
                      return (
                        <Button
                          style={{
                            background:
                              props.fontStyle === item ? "#ccc" : "none",
                          }}
                          onClick={() => props.setStyle(item)}
                        >
                          <FormatBoldIcon />
                        </Button>
                      );
                    case "italic":
                      return (
                        <Button
                          style={{
                            background:
                              props.fontStyle === item ? "#ccc" : "none",
                          }}
                          onClick={() => props.setStyle(item)}
                        >
                          <FormatItalicIcon />
                        </Button>
                      );
                  }
                })}
              </ButtonGroup>
            </FormControl>
          </TextGroup>
        )}
      </TextFieldGroup>
    </Wrapper>
  );
};

const mapStateToProps = (state: any) => {
  return {
    color: state.panelTools.color,
    lineWidth: state.panelTools.lineWidth,
    currentTool: state.panelTools.currentTool,
    currentFontSize: state.panelTools.currentFontSize,
    arrayFontSize: state.panelTools.arrayFontSize,
    arrayAlign: state.panelTools.arrayAlign,
    currentAlign: state.panelTools.currentAlign,
    valueText: state.panelTools.valueText,
    arrayFontStyle: state.panelTools.arrayFontStyle,
    fontStyle: state.panelTools.fontStyle,
  };
};

const action = {
  setColor: appActions.setColor,
  setWidth: appActions.setWidth,
  setCurrentSize: appActions.setCurrentSize,
  setAlign: appActions.setAlign,
  setStyle: appActions.setStyle,
  setValueText: appActions.setValueText,
};

export default connect(mapStateToProps, action)(TopPanel);
