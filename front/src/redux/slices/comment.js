import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
 import axios from "../../utils/axios"

 
export const fetchAddComment = createAsyncThunk('/fetchAddComment', async (comItem) => {
 
   const { data } = await axios.put(`/product/rating`, comItem);
   return data;
})
export const fetchComments = createAsyncThunk('/fetchComments', async (id) => {
   
   const { data } = await axios.get(`/product/all-ratings/${id}`);
   return data;
})


const initialState = {
    comment: {
        items: {},
        status: 'loading',
    },
};

const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {},
    extraReducers: {
     [fetchAddComment.pending]: (state) => {
        state.comment.items = [];
        state.comment.status = 'loading';
     },
     [fetchAddComment.fulfilled]: (state, action) => {
        state.comment.items = action.payload;
        state.comment.status = 'loaded';
     },
     [fetchAddComment.rejected]: (state) => {
        state.comment.items = [];
        state.comment.status = 'error';
     },

   [fetchComments.pending]: (state) => {
      state.comment.items = [];
      state.comment.status = 'loading';
   },
   [fetchComments.fulfilled]: (state, action) => {
      state.comment.items= action.payload;
      state.comment.status = 'loaded';
   },
   [fetchComments.rejected]: (state) => {
      state.comment.items = [];
      state.comment.status = 'error';
   },

    },
})

export const commentReducer = commentSlice.reducer;