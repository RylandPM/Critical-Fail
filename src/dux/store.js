import { createStore, combineReducers, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise-middleware";
import charReducer from "./charReducer";
import gameReducer from "./gameReducer";
import messageReducer from "./messageReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  character: charReducer,
  game: gameReducer,
  messages: messageReducer,
  user: userReducer
});

export default createStore(rootReducer, applyMiddleware(promiseMiddleware));
