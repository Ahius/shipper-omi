// import { configureStore } from '@reduxjs/toolkit';
// import rootReducer from '../reducers/index';

// const store = configureStore({
//   reducer: rootReducer,
// });

// export default store;


// store.js

// import { configureStore } from '@reduxjs/toolkit';
// import authReducer from '../actions/authSlice';

// const store = configureStore({
//   reducer: {
//     auth: authReducer

//   }
// });

// export default store;

// store/index.js

import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers/index';

const store = configureStore({
  reducer: rootReducer
});

export default store;

