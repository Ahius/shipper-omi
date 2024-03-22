import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from '../../../axios/axiosConfig.js';



export const FetchNotification = createAsyncThunk('noti/fetchNotification', async ({ ShipperId }, { rejectWithValue }) => {
    try {
        const token = await AsyncStorage.getItem('token');

        const respone = await axios.get(`/notification/${ShipperId}`, {

            headers: {
                Authorization: `Bearer ${token}`
            },
        });
        return respone.data;
    } catch (error) {
        return rejectWithValue(error.respone.data);
    }
});


export const updateNoti = createAsyncThunk(
    'noti/UpdateNoti',
    async ({ id }) => {
        try {
            const response = await axios.put(`/notification/${id}`);
            return response.data;
        } catch (error) {

            throw error;
        }
    }
);



const notiSlice = createSlice({
    name: 'noti',

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


        builder
            .addCase(updateNoti.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateNoti.fulfilled, (state, action) => {
                state.loading = false;
                // state.auth.shipperId = action.payload.shipperId; 
            })

            .addCase(updateNoti.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Something went wrong.';
            });


    },
});


export const { clearError } = notiSlice.actions;

export default notiSlice.reducer;