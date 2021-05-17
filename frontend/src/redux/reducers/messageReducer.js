import * as actionTypes from "../constants/authConstants";

const initialState = {message:""};

export const messageReducer = (state = initialState, action) =>{
  const { type, payload } = action;

  switch (type) {
    case actionTypes.SET_MESSAGE:
      return { message: payload };

    case actionTypes.CLEAR_MESSAGE:
      return { message: "" };

    default:
      return state;
  }
}