import { applyMiddleware, compose, createStore } from "redux";
import { persistStore } from "redux-persist";
import thunk from "redux-thunk";
import rootReducer from "./root-reducer";

const composeEnhancers =
  process.env.NODE_ENV !== "production" &&
  typeof window === "object" &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        shouldHotReload: false,
      })
    : compose;

const middlewares = [thunk];
const enhancers = [applyMiddleware(...middlewares)];
export const store = createStore(rootReducer, composeEnhancers(...enhancers));

export const persistor = persistStore(store);

export default { store, persistStore };
