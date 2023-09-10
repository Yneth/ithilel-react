import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import type {RootState} from "../root.store";
import {CreateEventRequest, EventListResponse, EventResponse, UpdateEventRequest} from "../../api/events/events.types";
import {createSelector} from "reselect";

type BetEventId = string;
export type ModalOptions = {
    open: boolean;
    eventId?: string;
}
export type BetEvent = EventResponse;

const INITIAL_STATE = {
    byId: {} as { [eventId: string]: BetEvent },
    modalOptions: {
        open: false,
        eventId: null as string | null | undefined
    } as ModalOptions,
};

const slice = createSlice({
    name: 'events',
    initialState: INITIAL_STATE,
    reducers: {
        fetchEventRequest: (state, _: PayloadAction<BetEventId>) => {
        },

        fetchEventSuccess: (state, {payload}: PayloadAction<EventResponse>) => {
            state.byId[payload.id] = payload;
        },

        openUpsertModal: (state, {payload}: PayloadAction<BetEventId | undefined>) => {
            state.modalOptions = {open: true, eventId: payload};
        },

        hideUpsertModal: (state) => {
            state.modalOptions = {open: false}
        },

        fetchEventsRequest: (_) => {
        },

        fetchEventsSuccess: (state, {payload}: PayloadAction<EventListResponse>) => {
            state.byId = payload.reduce((acc, event) => ({...acc, [event.id]: event}), {});
        },

        createEventRequest: (_, __: PayloadAction<CreateEventRequest>) => {
        },

        createEventSuccess: (state, {payload}: PayloadAction<CreateEventRequest>) => {
            state.byId[payload.id] = payload;
        },

        updateEventRequest: (_, __: PayloadAction<UpdateEventRequest>) => {
        },

        updateEventSuccess: (state, {payload}: PayloadAction<UpdateEventRequest>) => {
            state.byId[payload.id] = payload;
        },

        deleteEventRequest: (_, __: PayloadAction<BetEventId>) => {
        },

        deleteEventSuccess: (state, {payload}: PayloadAction<BetEventId>) => {
            delete state.byId[payload];
        },
    },
});

export const eventActions = slice.actions;

export const selectEvents = (state: RootState) => Object.values(state.events.byId);
export const selectEventsFiltered = createSelector(
    [
        selectEvents,
        (state: RootState, query: string | null | undefined) => query
    ],
    (events: EventListResponse, query: string | null | undefined) => {
        return query
            ? events.filter(event => event.name.toLowerCase().indexOf(query.toLowerCase()) >= 0)
            : events;
    }
);
export const selectEvent = (eventId: BetEventId) => (state: RootState) => state.events.byId[eventId];
export const selectMaybeEvent = (eventId?: BetEventId) => (state: RootState): BetEvent | undefined => {
    if (eventId) {
        return state.events.byId[eventId];
    }
}
export const selectModalOptions = (state: RootState) => state.events.modalOptions;

export default slice.reducer;