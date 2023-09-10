import createSagaMiddleware from "redux-saga";

export default createSagaMiddleware({
  onError(error: any, errorInfo: any) {
    console.error("uncaught error from saga middleware", error, errorInfo);
  },
});
