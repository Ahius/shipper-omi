// reducers/index.js

import { combineReducers } from 'redux';
import authSlice from './authSlice';
import areaSlice from './areaSlice';

const rootReducer = combineReducers({
  auth: authSlice,
  area: areaSlice,
});

export default rootReducer;
