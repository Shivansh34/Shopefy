import * as actionTypes from "../constants/cartConstants";

// var CART_INITIAL_STATE = ;

export const cartReducer = (state = {cartItems: [],loading:true,message:""}, action) => {
  switch (action.type) {
    case actionTypes.GET_CART_REQUEST:
      return {
        ...state,
        message:"loading"
      };
    case actionTypes.GET_CART_SUCCESS:
      return{
        ...state,
        loading:false,
        cartItems:action.payload,
        message:"succes",
      };
    case actionTypes.GET_CART_FAIL:
      return{
        loading:false,
        cartItems:[],
        message:action.payload,
      };
    default:
      return state;
  }
};
