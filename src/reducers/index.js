import transactioListReducer from "./transaction-list";
import {combineReducers} from 'redux'
import authReducer from "./auth";

export default combineReducers({
  transaction:transactioListReducer,
  auth:authReducer
})