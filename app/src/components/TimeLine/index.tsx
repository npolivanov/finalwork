import React, { useEffect } from "react";
import { connect } from "react-redux";
import { appActions } from "reducers/timeLine";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import WaveFormComponents from "./componenst/WaveForm";
var settings = {
  arrows: true,
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 10,
  slidesToScroll: 5,
};

const TimeLineStyled = styled.div`
  position: relative;
  z-index: 9999;
  width: 100%;
  height: 25vh;
  background-color: #dddddd;
`;

const Settings = styled.div`
  display: flex;
  background-color: #ddd;
  /* border-radius: 0% 0% 25% 25%; */
  justify-content: center;
`;

const TextShot = styled.p`
  font-size: 8px;
`;

const Shot = styled.div`
  max-width: 100px;
  p {
    margin-top: -20px;
    margin: auto;
  }
  img {
    width: 100px;
  }
`;

function TimeLine(props: any) {
  return (
    <TimeLineStyled>
      <Settings>
        <Button
          variant="contained"
          color="primary"
          onClick={props.clickDoneShot}
        >
          Click done shot
        </Button>
        <Button variant="contained" color="primary" onClick={props.createVideo}>
          Done video
        </Button>
        <Button variant="contained" color="primary" onClick={props.deleteVideo}>
          Delete all
        </Button>
        {/* <TextField id="outlined-basic" /> */}
      </Settings>
      <Slider {...settings}>
        {props.shots.map((shot: string, i: number) => (
          <Shot key={i}>
            <img src={shot} />
            <TextShot>1/24 - кадр в секунду</TextShot>
          </Shot>
        ))}
      </Slider>
      <WaveFormComponents />
    </TimeLineStyled>
  );
}

const mapStateToProps = (state: any) => {
  return {
    server: state.timeLine.server,
    shots: state.timeLine.shots,
  };
};

const action = {
  clickDoneShot: appActions.clickDoneShot,
  createVideo: appActions.createVideo,
  setServer: appActions.setServer,
  deleteVideo: appActions.deleteVideo,
};

export default connect(mapStateToProps, action)(TimeLine);
