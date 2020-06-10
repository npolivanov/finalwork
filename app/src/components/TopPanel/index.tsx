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
import ChangeHistoryIcon from "@material-ui/icons/ChangeHistory";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";

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
  backgroundColor: string;
  lineWidth: number;
  currentTool: string;
  arrayFontSize: Array<IFont>;
  currentFontSize: number;
  arrayAlign: Array<string>;
  currentAlign: string;
  valueText: string;
  arrayFontStyle: Array<string>;
  arrayFiguresDraw: Array<string>;
  fontStyle: string;
  selectedFigure: string;
  setColor(color: any): void;
  setWidth(width: number): void;
  setCurrentSize(payload: any): void;
  setAlign(payload: string): void;
  setValueText(payload: string): void;
  setStyle(payload: string): void;
  setSelectedFigure(payload: string): void;
  setBackgroundColor(payload: string): void;
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

const ColorPickerOverlayBG = styled.div`
  margin-left: 120px;
  position: relative;
`;
const ColorPicker = styled.div`
  position: absolute;
  color: white;
  z-index: 9999;
  top: 0px;
`;

const ColorPickerBG = styled.div`
  position: absolute;
  z-index: 9999;
  top: 0px;
  left: 100px;
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
  background-color: #ddd;
  box-sizing: border-box;
  padding: 10px;
  border-radius: 10px;
`;

const TextGroup = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonStyled = styled(Button)`
  color: white;
`;

const TopPanel = (props: IProps) => {
  const [displayColorPicker, setDisplayColorPicker] = useState<boolean>(false);
  const [displayColorPickerBG, setDisplayColorPickerBG] = useState<boolean>(
    false,
  );

  return (
    <Wrapper>
      <ButtonGroup>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setDisplayColorPicker(!displayColorPicker)}
        >
          Color <ColorDisplay color={props.color}></ColorDisplay>
        </Button>
      </ButtonGroup>
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
                {props.arrayAlign.map(item => {
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
                {props.arrayFontStyle.map((item, i) => {
                  switch (item) {
                    case "normal":
                      return (
                        <Button
                          style={{
                            background:
                              props.fontStyle === item ? "#ccc" : "none",
                          }}
                          key={i}
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
                          key={i}
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
                          key={i}
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
        {props.currentTool === "figure" && (
          <TextGroup>
            <ButtonGroup>
              <Button
                style={{ marginLeft: "20px" }}
                onClick={() => setDisplayColorPickerBG(!displayColorPickerBG)}
              >
                BGColor{" "}
                <ColorDisplay color={props.backgroundColor}></ColorDisplay>
              </Button>

              {displayColorPickerBG && (
                <ColorPickerOverlay>
                  <ColorPicker>
                    <ChromePicker
                      color={props.backgroundColor}
                      onChange={(ev: any) => {
                        const { r, g, b, a } = ev.rgb;
                        props.setBackgroundColor(
                          `rgba(${r}, ${g}, ${b}, ${a})`,
                        );
                      }}
                    />
                  </ColorPicker>
                </ColorPickerOverlay>
              )}
            </ButtonGroup>

            <FormControl style={{ marginLeft: "20px" }}>
              <ButtonGroup size="small">
                {props.arrayFiguresDraw.map((item, i) => {
                  switch (item) {
                    case "triangle":
                      return (
                        <Button
                          style={{
                            background:
                              props.selectedFigure === item ? "#ccc" : "none",
                          }}
                          key={i}
                          onClick={() => props.setSelectedFigure(item)}
                        >
                          <ChangeHistoryIcon />
                        </Button>
                      );
                    case "square":
                      return (
                        <Button
                          style={{
                            background:
                              props.selectedFigure === item ? "#ccc" : "none",
                          }}
                          key={i}
                          onClick={() => props.setSelectedFigure(item)}
                        >
                          <CheckBoxOutlineBlankIcon />
                        </Button>
                      );
                    case "circle":
                      return (
                        <Button
                          style={{
                            background:
                              props.selectedFigure === item ? "#ccc" : "none",
                          }}
                          key={i}
                          onClick={() => props.setSelectedFigure(item)}
                        >
                          <RadioButtonUncheckedIcon />
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
    backgroundColor: state.panelTools.backgroundColor,
    lineWidth: state.panelTools.lineWidth,
    currentTool: state.panelTools.currentTool,
    currentFontSize: state.panelTools.currentFontSize,
    arrayFontSize: state.panelTools.arrayFontSize,
    arrayAlign: state.panelTools.arrayAlign,
    currentAlign: state.panelTools.currentAlign,
    valueText: state.panelTools.valueText,
    arrayFontStyle: state.panelTools.arrayFontStyle,
    arrayFiguresDraw: state.panelTools.arrayFiguresDraw,
    selectedFigure: state.panelTools.selectedFigure,
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
  setBackgroundColor: appActions.setBackgroundColor,
  setSelectedFigure: appActions.setSelectedFigure,
};

export default connect(mapStateToProps, action)(TopPanel);
