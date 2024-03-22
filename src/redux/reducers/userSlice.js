import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from '../../../axios/axiosConfig.js';

export const profileUser = createAsyncThunk(
  "user/profile",
  async ({ ShipperId }, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(
        `/shipper/${ShipperId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      // console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "user/update",
  async ({ ShipperId, profileUpdate }, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem("token");
      // console.log("Id: ", ShipperId);
      // console.log("Data: ", profileUpdate);
      const response = await axios.put(
        `/shipper/${ShipperId}`,
        profileUpdate,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: null, 
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
        state.data = action.payload;
        state.error = null; 
      })
      .addCase(profileUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null; 
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = userSlice.actions;

export default userSlice.reducer;
