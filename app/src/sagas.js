import { takeEvery, all, take } from "redux-saga/effects";
import { actionTypes } from "reducers/controlScene";
import { actionTypes as actionTimeLine } from "reducers/timeLine";
import * as controlScene from "controlSaga";

export function* rootSaga() {
  yield takeEvery(actionTypes.SET_DRAW, controlScene.setDraw);
  yield takeEvery(actionTimeLine.CLICK_DONE_SHOT, controlScene.setScreenShot);
  yield takeEvery(actionTimeLine.CREATE_VIDEO, controlScene.createVideo);
  yield takeEvery(actionTimeLine.DELETE_VIDEO, controlScene.deleteVideo);
}
