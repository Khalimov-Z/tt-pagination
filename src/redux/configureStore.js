import { createLogger } from "redux-logger";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { comments } from "./ducks/comments";

const logger = createLogger({
  diff: true,
  collapsed: true,
});
export const store = createStore(comments, applyMiddleware(thunk, logger));
