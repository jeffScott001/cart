import { combineReducers } from "redux";
import shoeReducer from "./shoeReducer";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  shoes: shoeReducer,
  auth: authReducer,
  errors: errorReducer
});
