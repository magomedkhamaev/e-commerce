import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import {config} from "../../utils/axios"
import axios from "../../utils/axios"

// export const fetchAllProducts = createAsyncThunk('/getProducts', async (params) => {
//    const {priceFrom, priceTo, setColor,fSize,secSize, sortBy} = params;
//    const { data } = await axios.get(`http://localhost:5000/api/product/?${priceFrom}${priceTo}${setColor}${fSize}${secSize}${sortBy}`);
//    return data;
// })
export const getProducts = createAsyncThunk('/fetchAllProducts', async () => {
   const { data } = await axios.get(`http://localhost:5000/api/product`);
   return data;
})
export const fetchProducts = createAsyncThunk('/fetchProducts', async (params) => {
   const {priceFrom, priceTo, setColor,fSize,secSize, sortBy} = params;
   const { data } = await axios.get(`http://localhost:5000/api/product/?${priceFrom}${priceTo}${setColor}${fSize}${secSize}${sortBy}`);
   return data;
})
export const getSingleProduct = createAsyncThunk('/fetchSingleProducts', async (id) => {
   const { data } = await axios.get(`http://localhost:5000/api/product/${id}`);
   return data;
})

export const addToWishList = createAsyncThunk('/addToWishList', async (prodId) => {
   // const {id} = params;
   const { data } = await axios.put(`/product/wishlist`, prodId);
   return data;
})
// export const fetchWish = createAsyncThunk('/fetchWishProduct', async () => {
//    // const {id} = params;
//    const { data } = await wish.get('/user/wishlist');
//    return data;
// })


const initialState = {
    products: {
        items: [],
        status: 'loading',
    },
    single: {
        items: [],
        status: 'loading',
    }
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
   //    addItems(state, action) {
   //       state.items.push(action.payload);
   //   },
    },
    extraReducers: {
     [getProducts.pending]: (state) => {
        state.products.items = [];
        state.products.status = 'loading';
     },
     [getProducts.fulfilled]: (state, action) => {
        state.products.items = action.payload;
        state.products.status = 'loaded';
     },
     [getProducts.rejected]: (state) => {
        state.products.items = [];
        state.products.status = 'error';
     },
     [getSingleProduct.pending]: (state) => {
      state.single.items = [];
      state.single.status = 'loading';
   },
   [getSingleProduct.fulfilled]: (state, action) => {
      state.single.items = action.payload;
      state.single.status = 'loaded';
   },
   [getSingleProduct.rejected]: (state) => {
      state.single.items = [];
      state.single.status = 'error';
   },
     [fetchProducts.pending]: (state) => {
      state.products.items = [];
      state.products.status = 'loading';
   },
   [fetchProducts.fulfilled]: (state, action) => {
      state.products.items = action.payload;
      state.products.status = 'loaded';
   },
   [fetchProducts.rejected]: (state) => {
      state.products.items = [];
      state.products.status = 'error';
   },
     [addToWishList.pending]: (state) => {
      state.products.items = [];
      state.products.status = 'loading';
   },
   [addToWishList.fulfilled]: (state, action) => {
      state.products.items = action.payload;
      state.products.status = 'loaded';
   },
   [addToWishList.rejected]: (state) => {
      state.products.items = [];
      state.products.status = 'error';
   },
   // [fetchWish.pending]: (state) => {
   //    state.products.items = [];
   //    state.products.status = 'loading';
   // },
   // [fetchWish.fulfilled]: (state, action) => {
   //    state.products.items= action.payload;
   //    state.products.status = 'loaded';
   // },
   // [fetchWish.rejected]: (state) => {
   //    state.products.items = [];
   //    state.products.status = 'error';
   // },

//      [fetchTags.pending]: (state) => {
//         state.tags.items = [];
//         state.tags.status = 'loading';
//      },
//      [fetchTags.fulfilled]: (state, action) => {
//         state.tags.items = action.payload;
//         state.tags.status = 'loaded';
//      },
//      [fetchTags.rejected]: (state) => {
//         state.tags.items = [];
//         state.tags.status = 'error';
//      },

//    [fetchRemovePost.pending]: (state, action) => {
//       state.posts.items = state.posts.items.filter(obj => obj._id !== action.meta.arg);
//    },
    },
})

export const productsReducer = productsSlice.reducer;