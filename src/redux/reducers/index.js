
import { combineReducers } from 'redux';
import authSlice from './authSlice';
import areaSlice from './areaSlice';
import shipperHistorySlice from './shipperHistorySlice';
import orderSlice from './orderSlice';


const rootReducer = combineReducers({
  auth: authSlice,
  area: areaSlice,
  shipperOder: shipperHistorySlice,
  orderDetail: orderSlice

});

export default rootReducer;
