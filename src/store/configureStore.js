import PTReducer from "@reducers/PtReducer";
import ClientReducer from "@reducers/ClientReducer";
import { createStore, combineReducers } from "redux";
const rootReducer = combineReducers({ PTReducer, ClientReducer });
const configureStore = () => {
  return createStore(rootReducer);
};
export default configureStore;
