// reducers/index.js

import { combineReducers } from 'redux';
import authSlice from './authSlice';
import areaSlice from './areaSlice';
import userSlice from './userSlice';
import shipperHistorySlice from './shipperHistorySlice';


const rootReducer = combineReducers({
  auth: authSlice,
  area: areaSlice,
  user: userSlice,
  shipperOder: shipperHistorySlice

});

export default rootReducer;
