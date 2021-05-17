import * as actionTypes from "../constants/authConstants";
  
  const userfromloc = JSON.parse(localStorage.getItem("user"));
  
  const initialState = userfromloc;
  
  export const authReducer = (state = initialState, action)=> {
    const { type, payload } = action;
  
    switch (type) {
      case actionTypes.REGISTER_SUCCESS:
        return {
          ...state,
          isLoggedIn: false,
        };
      case actionTypes.REGISTER_FAIL:
        return {
          ...state,
          isLoggedIn: false,
        };
      case actionTypes.LOGIN_SUCCESS:
        return {
          ...state,
          isLoggedIn: true,
          user: payload,
        };
      case actionTypes.LOGIN_FAIL:
        return {
          ...state,
          isLoggedIn: false,
          user: null,
        };
      case actionTypes.LOGOUT:
        return {
          ...state,
          isLoggedIn: false,
          user: null,
        };
      default:
        return state;
    }
  }

