// reducers/index.js

import { combineReducers } from 'redux';
import authSlice from './authSlice';
import areaSlice from './areaSlice';
import shipperHistorySlice from './shipperHistorySlice';


const rootReducer = combineReducers({
  auth: authSlice,
  area: areaSlice,
  shipperOder: shipperHistorySlice

});

export default rootReducer;
