import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import rootReducer from './rootReducer';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSagas';


const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

if (import.meta.env.MODE === 'development') {
  middlewares.push(logger);
}

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(...middlewares),
});

sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);
export default store;
