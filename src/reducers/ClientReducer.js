import { GET_MY_COLLABORATION } from "@constants/";

const initialState = {
  myCollaboration: {}
};
// eslint-disable-next-line default-param-last
const ClientReducer = (state = initialState, action) => {
  console.log("DEBUG::  ~ action", action);
  switch (action.type) {
    case GET_MY_COLLABORATION:
      return {
        ...state,
        myCollaboration: action.payload
      };
    default:
      return state;
  }
};
export default ClientReducer;
