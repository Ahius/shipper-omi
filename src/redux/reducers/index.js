
import { combineReducers } from 'redux';
import authSlice from './authSlice';
import areaSlice from './areaSlice';
import userSlice from './userSlice';
import shipperHistorySlice from './shipperHistorySlice';
import orderSlice from './orderSlice';


const rootReducer = combineReducers({
  auth: authSlice,
  area: areaSlice,
  shipperOder: shipperHistorySlice,
  orderDetail: orderSlice,
  user: userSlice,

});

export default rootReducer;
