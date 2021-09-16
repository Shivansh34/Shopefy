import * as actionTypes from "../constants/authConstants";

import axios from "axios";
const config = {
  header: {
      "Content-Type": "application/json",
  },
};
  
export const register =  (email,firstname,lastname, password) => async  (dispatch,getState) => {
  try{
      dispatch({
          type: actionTypes.SET_MESSAGE,
          payload: "Creating profile"
      })
      const {data} = await axios.post('api/auth/register',{firstname,lastname,email,password},config).catch((error)=>{});
      dispatch({
        type: actionTypes.REGISTER_SUCCESS,
      });
      dispatch({
          type:actionTypes.LOGIN_SUCCESS,
          payload: {
              firstname: data.firstname,
              lastname: data.lastname,
              email: data.email,
              token: data.token,
          }
      })
      dispatch({
        type: actionTypes.SET_MESSAGE,
        payload: "Logged In",
      });    

      localStorage.setItem("user",JSON.stringify(getState().getuser));   
  }
  catch (error){
    console.log(error);
      const message =
        (error.response && error.response.data && error.response.data.message) ||error.message ||error.toString();

      dispatch({
        type: actionTypes.REGISTER_FAIL,
      });

      dispatch({
        type: actionTypes.SET_MESSAGE,
        payload: message,
      });
  }
};
  
export const login = (email, password) => async (dispatch,getState) => {
  try{
      dispatch({
          type: actionTypes.SET_MESSAGE,
          payload: "Logging in",
      });
      const {data} = await axios.post('api/auth/login',{email,password},config).catch((error)=>{throw(error);});
      dispatch({
          type: actionTypes.LOGIN_SUCCESS,
          payload: {
              firstname: data.firstname,
              lastname: data.lastname,
              email: data.email,
              token: data.token,
          }
      });    
      dispatch({
        type: actionTypes.SET_MESSAGE,
        payload: "Logged In",
      });
      localStorage.setItem("user",JSON.stringify(getState().getuser)); 
  }
  catch (error) {
      const message =(error.response && error.response.data && error.response.data.message) ||error.message ||error.toString();

      dispatch({
        type: actionTypes.LOGIN_FAIL,
      });

      dispatch({
        type: actionTypes.SET_MESSAGE,
        payload: message,
      });
    }
};
  
export const logout = () =>async (dispatch,getState) => {
  dispatch({
    type: actionTypes.LOGOUT,
  });
  localStorage.setItem("user",JSON.stringify(getState().getuser)); 
};