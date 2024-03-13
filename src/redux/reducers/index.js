// reducers/index.js

import { combineReducers } from 'redux';
import authSlice from '../actions/authSlice';

const rootReducer = combineReducers({
  auth: authSlice,
  // Thêm reducers khác nếu có
});

export default rootReducer;
