import { createStore, compose, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import controlScene from "reducers/controlScene";
import panelTools from "reducers/panelTools";
import TimeLine from "reducers/timeLine";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "sagas";

const sagaMiddleware = createSagaMiddleware();
const reducers = combineReducers({
  controlScene,
  panelTools,
  timeLine: TimeLine,
});

const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(rootSaga);

export default store;
