import createSagaMiddleware from "@redux-saga/core";
import { configureStore } from "@reduxjs/toolkit";
import rootSaga from "./rootSagas";
import rootReducers from "./rootReducer";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: rootReducers,
    middleware: [sagaMiddleware]
});

sagaMiddleware.run(rootSaga);

export default store;