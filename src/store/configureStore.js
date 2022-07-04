import PTReducer from "@reducers/reducer";
import { createStore, combineReducers } from "redux";
const rootReducer = combineReducers({ PTReducer });
const configureStore = () => {
  return createStore(rootReducer);
};
export default configureStore;
