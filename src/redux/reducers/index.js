
import { combineReducers } from 'redux';
import authSlice from './authSlice';
import areaSlice from './areaSlice';
import userSlice from './userSlice';
import shipperHistorySlice from './shipperHistorySlice';
import orderSlice from './orderSlice';
import orderActivitySlice from './orderActivitySlice';


const rootReducer = combineReducers({
  auth: authSlice,
  area: areaSlice,
  shipperOder: shipperHistorySlice,
  orderDetail: orderSlice,
  user: userSlice,
  orderActivity: orderActivitySlice,

});

export default rootReducer;
