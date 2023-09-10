import {all, call, put, StrictEffect, takeLatest} from "redux-saga/effects";
import bets from "../../api/bets/bets.api";
import {betActions} from "./bets.slice";
import {BetListResponse, BetResponse, CreateBetRequest} from "../../api/bets/bets.types";
import {notificationActions} from "../notifications.slice";
import {PayloadAction} from "@reduxjs/toolkit";


function* fetchBets(): Generator<StrictEffect, any, BetListResponse> {
    try {
        const betResponse = yield call(bets.getAll);
        yield put(betActions.fetchBetsSuccess(betResponse));
    } catch (error: any) {
        yield put(notificationActions.showNotification({
            message: String(error) || 'Internal error',
            severity: 'error',
        }));
    }
}

function* createBet(action: PayloadAction<CreateBetRequest>): Generator<StrictEffect, any, BetResponse> {
    try {
        const betResponse = yield call(bets.create, action.payload);
        yield put(betActions.createBetSuccess(betResponse));
    } catch (error: any) {
        yield put(notificationActions.showNotification({
            message: String(error) || 'Internal error',
            severity: 'error',
        }));
    }
}

function* removeBet(action: PayloadAction<string>): Generator<StrictEffect, any, void> {
    try {
        yield call(bets.remove, action.payload);
        yield put(betActions.deleteBetSuccess(action.payload));
    } catch (error: any) {
        yield put(notificationActions.showNotification({
            message: String(error) || 'Internal error',
            severity: 'error',
        }));
    }
}

function* watchBetsSaga() {
    yield takeLatest(betActions.fetchBetsRequest.type, fetchBets);
    yield takeLatest(betActions.createBetRequest.type, createBet);
    yield takeLatest(betActions.deleteBetRequest.type, removeBet);
}

function* betsSaga() {
    yield all([
        watchBetsSaga()
    ]);
}

export default betsSaga;