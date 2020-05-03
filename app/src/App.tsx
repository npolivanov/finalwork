import React, { useEffect } from "react";
import styled from "styled-components";
import Scene from "components/Scene";
import PanelTools from "components/PanelTools";
import TimeLine from "components/TimeLine";
import TopPanel from "components/TopPanel";

const Wrapper = styled.div``;

function App() {
  return (
    <Wrapper>
      <TopPanel />
      <PanelTools />
      <Scene />
      <TimeLine />
    </Wrapper>
  );
}

export default App;
