import reducer from "@reducers/reducer";
import { createStore, combineReducers } from "redux";
const rootReducer = combineReducers({ collaboration: reducer });
const configureStore = () => {
  return createStore(rootReducer);
};
export default configureStore;
