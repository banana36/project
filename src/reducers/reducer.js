import { GET_COLLABORATION } from "@constants/";

const initialState = {
  collaborations: {}
};
// eslint-disable-next-line default-param-last
const reducer = (state = initialState, action) => {
  console.log("DEBUG::  ~ action", action);
  switch (action.type) {
    case GET_COLLABORATION:
      return {
        ...state,
        collaborations: action.payload
      };
    default:
      return state;
  }
};
export default reducer;
