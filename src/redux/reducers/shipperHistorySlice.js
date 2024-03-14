import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



export const FetchshipperOrders = createAsyncThunk('shipper/fetchOders', async ({ ShipperId }, { rejectWithValue }) => {
    try {
        const token = AsyncStorage.getItem('token');
        const response = await axios.get(`https://onlinemarket-api.nguyenminhhai.us/api/v1/customer-order/shipper/${ShipperId}?status=Canceled`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});


const shipperSlice = createSlice({
    name: 'shipperOder',
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
            .addCase(FetchshipperOrders.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(FetchshipperOrders.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(FetchshipperOrders.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const { clearError } = shipperSlice.actions;
export default shipperSlice.reducer;