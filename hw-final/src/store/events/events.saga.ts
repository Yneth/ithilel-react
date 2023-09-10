import {all, call, put, StrictEffect, takeEvery} from "redux-saga/effects";
import events from "../../api/events/events.api";
import {eventActions} from "./events.slice";
import {CreateEventRequest, EventListResponse, EventResponse, UpdateEventRequest} from "../../api/events/events.types";
import {notificationActions} from "../notifications.slice";
import {PayloadAction} from "@reduxjs/toolkit";
import {BetListResponse} from "../../api/bets/bets.types";
import bets from "../../api/bets/bets.api";
import {betActions} from "../bets/bets.slice";

function* fetchEvent({payload}: PayloadAction<string>): Generator<StrictEffect, any, [EventResponse, BetListResponse]> {
    try {
        const [event, eventBets] = yield all([
            call(events.findById, payload),
            call(bets.findByEventId, payload)
        ]);
        yield all([
            put(eventActions.fetchEventSuccess(event)),
            put(betActions.fetchBetsSuccess(eventBets))
        ]);
    } catch (error: any) {
        yield put(notificationActions.showNotification({
            message: String(error) || 'Internal error',
            severity: 'error',
        }));
    }
}

function* fetchEvents(): Generator<StrictEffect, any, EventListResponse> {
    try {
        const eventResponse = yield call(events.getAll);
        yield put(eventActions.fetchEventsSuccess(eventResponse));
    } catch (error: any) {
        yield put(notificationActions.showNotification({
            message: String(error) || 'Internal error',
            severity: 'error',
        }));
    }
}

function* createEvent({payload}: PayloadAction<CreateEventRequest>): Generator<StrictEffect, any, EventResponse> {
    try {
        const eventResponse = yield call(events.create, payload);
        yield all([
            put(eventActions.createEventSuccess(eventResponse)),
            put(eventActions.hideUpsertModal())
        ]);
    } catch (error: any) {
        yield put(notificationActions.showNotification({
            message: String(error) || 'Internal error',
            severity: 'error',
        }));
    }
}

function* updateEvent({payload}: PayloadAction<UpdateEventRequest>): Generator<StrictEffect, any, EventResponse> {
    try {
        const eventResponse = yield call(events.update, payload);
        yield all([
            put(eventActions.updateEventSuccess(eventResponse)),
            put(eventActions.hideUpsertModal())
        ]);
    } catch (error: any) {
        yield put(notificationActions.showNotification({
            message: String(error) || 'Internal error',
            severity: 'error',
        }));
    }
}

function* removeEvent({payload}: PayloadAction<string>): Generator<StrictEffect, any, void> {
    try {
        yield call(events.remove, payload);
        yield put(eventActions.deleteEventSuccess(payload));
    } catch (error: any) {
        yield put(notificationActions.showNotification({
            message: String(error) || 'Internal error',
            severity: 'error',
        }));
    }
}

function* watchEventsSaga() {
    yield takeEvery(eventActions.fetchEventRequest.type, fetchEvent);
    yield takeEvery(eventActions.fetchEventsRequest.type, fetchEvents);
    yield takeEvery(eventActions.createEventRequest.type, createEvent);
    yield takeEvery(eventActions.updateEventRequest.type, updateEvent);
    yield takeEvery(eventActions.deleteEventRequest.type, removeEvent);
}

function* eventsSaga() {
    yield all([
        watchEventsSaga()
    ]);
}

export default eventsSaga;