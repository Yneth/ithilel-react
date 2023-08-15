import {applyMiddleware, createStore} from 'redux';
import rootReducer from "./root.reducer";
import thunk from "redux-thunk";
import {createLogger} from "redux-logger";


const logger = createLogger({
    collapsed: true
});

const syncMiddleware = [logger];
const asyncMiddleware = [thunk];

const middleware = applyMiddleware.apply([...asyncMiddleware, ...syncMiddleware]);

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

export default store;