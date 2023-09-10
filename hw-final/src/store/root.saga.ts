import {all, fork} from 'redux-saga/effects'
import betsSaga from "./bets/bets.saga";
import eventsSaga from "./events/events.saga";

export default function* rootSaga() {
    yield all([
        fork(betsSaga),
        fork(eventsSaga),
    ]);
}