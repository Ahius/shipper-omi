import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const login = createAsyncThunk('auth/login', async ({ Phone, Password }, { rejectWithValue }) => {
  try {
    const response = await axios.post('https://onlinemarket-api.nguyenminhhai.us/api/v1/shipper?action=login', {
      Phone: Phone,
      Password: Password
    });
    // dispatch(shipperOrders(response.data.ShipperId));
    return response.data;

  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const logout = () => async (dispatch) => {
  try {
    // Xóa token từ AsyncStorage
    await AsyncStorage.removeItem('token');
    // Đưa state về trạng thái ban đầu
    dispatch({ type: 'auth/logout' });
  } catch (error) {
    console.error('Error logging out:', error);
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    error: null,
    loading: false
  },
  reducers: {
    clearError(state) {
      state.error = null;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.data.token;
        state.error = null;
        state.shipperId = action.payload.data.shipper.ShipperId;
        // Lưu token vào AsyncStorage
        AsyncStorage.setItem('token', state.token)
          .then(() => console.log('Token saved to AsyncStorage'))
          .catch(error => console.error('Error saving token to AsyncStorage:', error));
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      .addCase('auth/logout', (state) => {
        state.token = null;
      });
  }
});

export const { clearError } = authSlice.actions;

export default authSlice.reducer;
