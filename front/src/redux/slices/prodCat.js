import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../utils/axios';

export const fetchProdCat = createAsyncThunk ('category/getAll', async () => {
    const { data } = await axios.get('/category/');
    return data;
});
export const fetchProdSingleCat = createAsyncThunk ('category/getSingle', async (id) => {
    const { data } = await axios.get(`/category/${id}`);
    return data;
});


const initialState = {
    items: [],
    status: 'loading',
    single: {
        items: [],
        status: 'loading',
    }
}

const prodCatSlice = createSlice({
    name: 'prodCat',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchProdCat.pending]: (state) => {
            state.status = 'loading';
            state.items = null;
         },
         [fetchProdCat.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.items = action.payload;
         },
         [fetchProdCat.rejected]: (state) => {
            state.status = 'error';
            state.items = null;
         },
         [fetchProdSingleCat.pending]: (state) => {
            state.single.status = 'loading';
            state.single.items = [];
         },
         [fetchProdSingleCat.fulfilled]: (state, action) => {
            state.single.status = 'loaded';
            state.single.items = action.payload;
         },
         [fetchProdSingleCat.rejected]: (state) => {
            state.single.status = 'error';
            state.single.items = [];
         },
     },
    
});

export const prodCatReducer = prodCatSlice.reducer;