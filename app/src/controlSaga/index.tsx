import { put, call, select } from "redux-saga/effects";
import request, { requestGet } from "api/request";

export function* setDraw(payload: boolean) {
  console.log("SAGA WORKING!!!");
}

export function* setScreenShot() {
  const timeLine = yield select(store => store.timeLine);

  const wrapper: HTMLHeadingElement | null = document.querySelector(
    "#mainCanvas",
  );
  if (wrapper !== null) {
    const canvas: any = wrapper.querySelector("canvas");
    if (canvas !== null) {
      yield put({ type: "SET_SHOTS_SCREENSHOT", payload: canvas.toDataURL() });
      request(`${timeLine.server}/short`, canvas.toDataURL());
    }
  }
}
export function* createVideo() {
  const timeLine = yield select(store => store.timeLine);
  requestGet(`${timeLine.server}/createvideo`).then(() => {
    window.open(`${timeLine.server}/createvideo`);
  });
}

export function* deleteVideo() {
  const timeLine = yield select(store => store.timeLine);

  requestGet(`${timeLine.server}/delete`);
}

export function* setSong({ payload }: any) {
  const timeLine = yield select(store => store.timeLine);

  let formdata = new FormData();

  formdata.append("audio", payload);

  request(`${timeLine.server}/audio`, formdata, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
