import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const profileUser = createAsyncThunk(
  "user/profile",
  async (ShipperId, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem('token'); // Await AsyncStorage.getItem()
      if (!token) {
        console.log("Can't get Token");
        // You might want to return here if token is not available
      }
      const response = await axios.get(
        `https://onlinemarket-api.nguyenminhhai.us/api/v1/shipper/${ShipperId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      // Reject with value for rejection with payload
      return rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
    name: "user",
    initialState: {
      shipper: null, // Initial state for shipper data
      loading: false,
      error: null,
    },
    reducers: {
      clearError(state) {
        state.error = null;
      },
    },
    extraReducers(builder) {
      builder
        .addCase(profileUser.pending, (state) => {
          state.loading = true;
        })
        .addCase(profileUser.fulfilled, (state, action) => {
          state.loading = false;
          state.shipper = action.payload; // Update shipper data
          state.error = null; // Clear error on successful fetch
        })
        .addCase(profileUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload.message;
        });
    },
  });
  
export const { clearError } = userSlice.actions;

export default userSlice.reducer;
