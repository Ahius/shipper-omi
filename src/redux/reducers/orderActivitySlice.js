import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";




export const FetchOrderActivity = createAsyncThunk('oderActivity/fetch', async ({ CustomerOrderId }, { rejectWithValue }) => {
    try {
        const token = await AsyncStorage.getItem('token');
        const respone = await axios.get(`https://onlinemarket-api.nguyenminhhai.us/api/v1/order-activity/${CustomerOrderId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
        return respone.data;
    } catch (error) {
        return rejectWithValue(error.respone.data);
    }
})



const activitySlice = createSlice({
    name:'orderActivity',
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

    extraReducers: (builder) => {
        builder
            .addCase(FetchOrderActivity.pending, (state) => {
                state.loading = true;
            })
            .addCase(FetchOrderActivity.fulfilled, (state, action) => {
                state.data = action.payload;

            })
            .addCase(FetchOrderActivity.rejected, (state, action) => {

                state.error = action.payload;
            });
    },
});


export const { clearError } = activitySlice.actions;

export default activitySlice.reducer;