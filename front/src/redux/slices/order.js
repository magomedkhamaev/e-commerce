import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
 import wish from "../../utils/axios"

export const fetchCreateOrder = createAsyncThunk('/fetchCreateOrder', async (orderItem) => {
   const { data } = await wish.post(`/user//cart/cash-order`, orderItem);
   return data;
})
export const fetchOrder = createAsyncThunk('/fetchOrder', async () => {

   const { data } = await wish.get('/user/get-orders');
   return data;
})


const initialState = {
    order: {
        items: {},
        status: 'loading',
    },
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: { },
    extraReducers: {
     [fetchCreateOrder.pending]: (state) => {
        state.order.items = [];
        state.order.status = 'loading';
     },
     [fetchCreateOrder.fulfilled]: (state, action) => {
        state.order.items = action.payload;
        state.order.status = 'loaded';
     },
     [fetchCreateOrder.rejected]: (state) => {
        state.order.items = [];
        state.order.status = 'error';
     },

   [fetchOrder.pending]: (state) => {
      state.order.items = [];
      state.order.status = 'loading';
   },
   [fetchOrder.fulfilled]: (state, action) => {
      state.order.items= action.payload;
      state.order.status = 'loaded';
   },
   [fetchOrder.rejected]: (state) => {
      state.order.items = [];
      state.order.status = 'error';
   },


    },
})

export const orderReducer = orderSlice.reducer;