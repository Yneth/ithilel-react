import {combineReducers} from "redux";
import popularReducer from "./popular.reducer";
import battleReducer from "./battle.reducer";

const reducers = {
    popular: popularReducer,
    battle: battleReducer,
};

export default combineReducers(reducers);