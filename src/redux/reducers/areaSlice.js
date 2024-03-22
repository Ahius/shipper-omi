import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../../axios/axiosConfig.js';

export const fetchArea = createAsyncThunk('area/fetch', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get('/area');
        return response.data; 
    } catch (error) {
        if (error.response) {
            return rejectWithValue(error.response.data);
        } else if (error.request) {
         
            return rejectWithValue({ message: 'No response received from server.' });
        } else {
            
            return rejectWithValue({ message: 'Error setting up the request.' });
        }
    }
});


const areaSlice = createSlice({
    name: 'areaSlice',
    initialState: {
      error: null,
      loading: false,
      data: null
    },
    reducers: {
      clearError(state) {
        state.error = null;
      }
    },
    extraReducers(builder) {
      builder
        .addCase(fetchArea.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchArea.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload; 
          state.error = null;
        })
        .addCase(fetchArea.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload.message;
        });
    }
  });
  
  export const { clearError } = areaSlice.actions;
  
  export default areaSlice.reducer;
  
