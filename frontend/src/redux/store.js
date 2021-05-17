import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// Reducers
import { cartReducer } from "./reducers/cartReducers";
import {
  getProductsReducer,
  getProductDetailsReducer,
} from "./reducers/productReducers";
import {messageReducer} from "./reducers/messageReducer";
import {authReducer} from './reducers/authReducer';

const reducer = combineReducers({
  getuser: authReducer,
  getcart: cartReducer,
  getmessage: messageReducer,
  getProducts: getProductsReducer,
  getProductDetails: getProductDetailsReducer,
});

const middleware = [thunk];

const user = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  :{ isLoggedIn: false, user: null } ;

const INITIAL_STATE = {
  getuser: user
  ,
};

const store = createStore(
  reducer,
  INITIAL_STATE,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
