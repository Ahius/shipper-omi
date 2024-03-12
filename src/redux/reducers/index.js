

import { combineReducers } from 'redux';
import authSlice from '../actions/authSlice';

const rootReducer = combineReducers({
  auth: authSlice,

});

export default rootReducer;
