import React, { useEffect } from "react";
import styled from "styled-components";
import Scene from "components/Scene";
import PanelTools from "components/PanelTools";
import TimeLine from "components/TimeLine";

const Wrapper = styled.div``;

function App() {
  return (
    <Wrapper>
      <PanelTools />
      <Scene />
      <TimeLine />
    </Wrapper>
  );
}

export default App;
