import { createStore, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise-middleware";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import rootReducer from "./reducers";

const persistConfig = {
  key: "root",
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const middlewares = [promiseMiddleware];

if (process.env.NODE_ENV === `development`) {
  const { logger } = require(`redux-logger`);

  middlewares.push(logger);
}

const store = createStore(persistedReducer, applyMiddleware(...middlewares));
const persistor = persistStore(store);
const Store = { store, persistor };

export default Store;
