import {combineReducers} from "@reduxjs/toolkit";
import betsReducer from "./bets/bets.slice";
import eventsReducer from "./events/events.slice";
import notificationsReducer from "./notifications.slice";

const rootReducer = combineReducers({
    bets: betsReducer,
    events: eventsReducer,
    notifications: notificationsReducer
});

export default rootReducer;