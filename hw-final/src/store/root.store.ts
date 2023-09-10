import {configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import loggerMiddleware from "./_middlewares/logger.middleware";
import sagaMiddleware from "./_middlewares/saga.middleware";
import rootReducer from "./root.reducer";
import rootSaga from "./root.saga";

const middlewares = [loggerMiddleware, sagaMiddleware];
export const rootStore = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(middlewares)
});

export type RootState = ReturnType<typeof rootStore.getState>;
export type AppDispatch = typeof rootStore.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

sagaMiddleware.run(rootSaga);

export default rootStore;

