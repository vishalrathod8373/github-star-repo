import { all, fork } from "redux-saga/effects";
import { watchCodeFreq, watchCommit, watchContributors, watchGetRepo } from "./saga";

const rootSaga = function* () {
  yield all([
    fork(watchGetRepo),
    fork(watchCodeFreq),
    fork(watchCommit),
    fork(watchContributors)
  ]);
};

export default rootSaga;