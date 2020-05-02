import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import store from "store";
import { appActions } from "reducers/controlScene";

(window as any).addEventListener("wheel", (e: any) => {
  let scale: number = store.getState().controlScene.scale;
  if (e.wheelDelta > 0 && scale < 5) {
    scale += 0.1;
  }

  if (e.wheelDelta < 0 && scale > 0.5) {
    scale -= 0.1;
  }
  store.dispatch(appActions.setScale(scale));
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
