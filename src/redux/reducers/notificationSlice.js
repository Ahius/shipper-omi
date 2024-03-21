import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



export const FetchNotification = createAsyncThunk('order/fetchNotification', async({ShipperId}, {rejectWithValue}) => {
    try {
        const token = await AsyncStorage.getItem('token');

        const respone = await axios.get(`https://onlinemarket-api.nguyenminhhai.us/api/v1/notification/${ShipperId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
        return respone.data;
    } catch (error) {
        return rejectWithValue(error.respone.data);
    }
});



const notiSlice = createSlice({
    name:'noti',
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
            .addCase(FetchNotification.pending, (state) => {
                state.loading = true;
            })
            .addCase(FetchNotification.fulfilled, (state, action) => {
                state.data = action.payload;

            })
            .addCase(FetchNotification.rejected, (state, action) => {

                state.error = action.payload;
            });
    },
});


export const { clearError } = notiSlice.actions;

export default notiSlice.reducer;