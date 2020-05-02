import React from "react";
import { connect } from "react-redux";
import { appActions } from "reducers/timeLine";
import Button from "@material-ui/core/Button";

function TimeLine(props: any) {
  return (
    <React.Fragment>
      <Button variant="contained" onClick={props.clickDoneShot}>
        Click done shot
      </Button>
      <Button variant="contained" onClick={props.createVideo}>
        Done video
      </Button>
    </React.Fragment>
  );
}

// const mapStateToProps = (state: any) => {
//   return {
//     draw: state.controlScene.draw,
//     scale: state.controlScene.scale,
//   };
// };

const action = {
  clickDoneShot: appActions.clickDoneShot,
  createVideo: appActions.createVideo,
};

export default connect(() => {}, action)(TimeLine);
