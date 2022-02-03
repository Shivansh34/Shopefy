import * as actionTypes from "../constants/cartConstants";
import {logout} from '../actions/authActions';
import axios from "axios";


export const getCart=()=>async(dispatch,getState)=>{
  const config ={
    headers:{
      'Content-Type': 'application/json',
      'token': JSON.parse(localStorage.getItem("user")).user.token,
    }
  }
  try {
    dispatch({type:actionTypes.GET_CART_REQUEST});
    const {data} = await axios.post('/api/private/cart',{},config).catch((error)=>{if(error.response.status===401){
      dispatch(logout());
    }
    throw(error);});
    dispatch({type:actionTypes.GET_CART_SUCCESS,payload:data});
  } catch (error) {
    dispatch({
      type:actionTypes.GET_CART_FAIL,
      payload:(error.response && error.response.data && error.response.data.message) ||error.message,
    });
  }
}

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const config ={
    headers:{
      'Content-Type': 'application/json',
      'token': JSON.parse(localStorage.getItem("user")).user.token,
    }
  }
  try {
    await axios.post('/api/private/cart/add',{productid:id,qty},config).catch((error)=>{
      if(error.response.status===401){
        dispatch(logout());
      }
      throw(error);});
      dispatch(getCart());
  } catch (error) {
    dispatch({
      type:actionTypes.GET_CART_FAIL,
      payload:(error.response && error.response.data && error.response.data.message) ||error.message,
    });
  }
};

export const updateCart = (id,qty) => async (dispatch, getState) => {
  const config ={
    headers:{
      'Content-Type': 'application/json',
      'token': JSON.parse(localStorage.getItem("user")).user.token,
    }
  }
  try {
    await axios.post('/api/private/cart/update',{cartitemid:id,qty:qty},config).catch((error)=>{if(error.response.status===401){
      dispatch(logout());
    }
    throw(error);});
    dispatch(getCart());
  } catch (error) {
    dispatch({
      type:actionTypes.GET_CART_FAIL,
      payload:(error.response && error.response.data && error.response.data.message) ||error.message,
    });
  }
  
};
