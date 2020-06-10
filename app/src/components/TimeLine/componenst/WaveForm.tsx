import React from "react";
import Waveform from "waveform-react";

export default class WaveFormComponents extends React.Component<any> {
  render() {
    return (
      <Waveform
        // Audio buffer

        // waveform height
        width={600}
        height={800}
        markerStyle={{
          // Position marker color
          color: "red",
          // Position marker width (in pixels)
          width: 4,
        }}
        // Optionally handle user manually changing position (0 - 1)
        onPositionChange={(pos: any) => console.log(pos)}
        // Marker position on waveform (0 - 1)
        position={0.5}
        // redraw waveform on window size change (default: true)
        responsive={false}
        // Show position marker
        showPosition={true}
        waveStyle={{
          // animate waveform on draw (default: true)
          animate: true,
          // waveform color
          color: "red",
          // width of each rendered point (min: 1, max: 10)
          pointWidth: 1,
        }}
        // waveform width
      />
    );
  }
}
