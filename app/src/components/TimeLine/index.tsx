import React, { useEffect } from "react";
import { connect } from "react-redux";
import { appActions } from "reducers/timeLine";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
var settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 10,
  slidesToScroll: 1,
};

const TimeLineStyled = styled.div`
  position: relative;
  z-index: 9999;
  width: 100%;
  height: 25vh;
  background-color: #262c34;
`;

const Settings = styled.div`
  display: flex;
  background-color: #ddd;
  /* border-radius: 0% 0% 25% 25%; */
  justify-content: center;
`;

const Shot = styled.div`
  p {
    margin-top: -20px;
    margin: auto;
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
        <TextField
          id="outlined-basic"
          value={props.server}
          label="server"
          variant="filled"
          onChange={e => props.setServer(e.target.value)}
        />
      </Settings>
      <Slider {...settings}>
        {props.shots.map((shot: string, i: number) => (
          <Shot key={i}>
            <img width={"150px"} src={shot} />
            <p>1/24</p>
          </Shot>
        ))}
      </Slider>
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
};

export default connect(mapStateToProps, action)(TimeLine);
