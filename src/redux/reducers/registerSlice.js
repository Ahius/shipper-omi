import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const registerShipper = createAsyncThunk(
  'shipper/register',
  async (shipperData, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://onlinemarket-api.nguyenminhhai.us/api/v1/shipper?action=register', shipperData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const shipperSlice = createSlice({
  name: 'shipper',
  initialState: {
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerShipper.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerShipper.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(registerShipper.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      });
  },
});

export default shipperSlice.reducer;
