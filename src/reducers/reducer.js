import { GET_MY_CLIENTS } from "@constants/";

const initialState = {
  myClients: {}
};
// eslint-disable-next-line default-param-last
const PTReducer = (state = initialState, action) => {
  console.log("DEBUG::  ~ action", action);
  switch (action.type) {
    case GET_MY_CLIENTS:
      return {
        ...state,
        myClients: action.payload
      };
    default:
      return state;
  }
};
export default PTReducer;
