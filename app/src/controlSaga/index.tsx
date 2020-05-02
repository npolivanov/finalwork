import { put, call, select } from "redux-saga/effects";
import request, { requestGet } from "api/request";

export function* setDraw(payload: boolean) {
  console.log("SAGA WORKING!!!");
}

export function* setScreenShot() {
  const wrapper: HTMLHeadingElement | null = document.querySelector(
    "#mainCanvas",
  );
  if (wrapper !== null) {
    const canvas: any = wrapper.querySelector("canvas");
    if (canvas !== null) {
      request("http://localhost:5000/short", canvas.toDataURL());
      console.log(canvas.toDataURL());
    }
  }
}
export function* createVideo() {
  requestGet("http://localhost:5000/createvideo");
}
