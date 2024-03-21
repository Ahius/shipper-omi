
import { combineReducers } from 'redux';
import authSlice from './authSlice';
import areaSlice from './areaSlice';
import userSlice from './userSlice';
import shipperHistorySlice from './shipperHistorySlice';
import orderSlice from './orderSlice';
import orderActivitySlice from './orderActivitySlice';
import notificationSlice from './notificationSlice';


const rootReducer = combineReducers({
  auth: authSlice,
  area: areaSlice,
  shipperOder: shipperHistorySlice,
  orderDetail: orderSlice,
  user: userSlice,
  orderActivity: orderActivitySlice,
  noti: notificationSlice,

});

export default rootReducer;
