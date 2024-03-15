import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



export const FetchOrderDetail = createAsyncThunk('order/fetchOrderDetail', async({CustomerOrderId}, {rejectWithValue}) => {
    try {
        const token = AsyncStorage.getItem(token);
        const respone = await axios.get(`https://onlinemarket-api.nguyenminhhai.us/api/v1/order-detail/order/${CustomerOrderId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
        return respone.data;
    } catch (error) {
        return rejectWithValue(error.respone.data);
    }
});



const orderSlice = createSlice({
    name:'orderDetail',
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
            .addCase(FetchOrderDetail.pending, (state) => {
                state.loading = true;
            })
            .addCase(FetchOrderDetail.fulfilled, (state, action) => {
                state.data = action.payload;

            })
            .addCase(FetchOrderDetail.rejected, (state, action) => {

                state.error = action.payload;
            });
    },
});


export const { clearError } = orderSlice.actions;

export default orderSlice.reducer;