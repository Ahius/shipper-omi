// reducers/index.js

import { combineReducers } from 'redux';
import authSlice from './authSlice';
import areaSlice from './areaSlice';
import userSlice from './userSlice';

const rootReducer = combineReducers({
  auth: authSlice,
  area: areaSlice,
  user: userSlice
});

export default rootReducer;
