import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../utils/axios';

export const fetchAuth = createAsyncThunk ('auth/login', async (params) => {
    const { data } = await axios.post('/user/login', params);
    return data;
});
  
 export const fetchRegister = createAsyncThunk ('auth/register', async (params) => {
   const { data } = await axios.post('/user/register', params);
   return data;
 });

export const getUserWishList = createAsyncThunk ('auth/getWishList', async () => {
   const { data } = await axios.get('/user/wishlist');
   return data;
 });

//  export const fetchLogout = createAsyncThunk ('auth/fetchLogout', async () => {
//    const { data } = await axios.get('/user/logout');
//    return data;
//  });

//  export const fetchMe = createAsyncThunk ('auth/fetchMe', async () => {
//    const { data } = await axios.get('/user/me');
//    return data;
//  });
export const addToCart = createAsyncThunk ('auth/addToCart', async (cartData) => {
   const { data } = await axios.post('/user/cart', cartData);
   return data;
 });
 export const getUserCart = createAsyncThunk ('auth/getUserCart', async () => {
   const { data } = await axios.get('/user/cart');
   return data;
 });
 export const removeProductFromCart = createAsyncThunk('/removeFromCart', async (id) => {
   // const {id} = params;
   
   const { data } = await axios.delete(`/user/delete-product-cart/${id}`);
   return data;
})
export const updateProductFromCart = createAsyncThunk('/updateFromCart', async (cartDetail) => {
   // const {id} = params;
   const { data } = await axios.put(`/user/update-product-cart/${cartDetail.cartItemId}/${cartDetail.quantity}`);
   return data;
})

export const createOrder = createAsyncThunk('/createOrder', async (orderDetail) => {
  console.log(orderDetail);
   // const {id} = params;
   const { data } = await axios.post(`/user/cart/create-order`, orderDetail);
   return data;
})

export const updateProfile = createAsyncThunk('/updateUserProfile', async (dataPro) => {
   // const {id} = params;
   const { data } = await axios.put(`/user/edit-user`, dataPro);
   return data;
})

const initialState = {
    cartIt: {
      items: [],
      status: 'loading'
    },
    data: null,
    status: 'loading',
    
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
          state.data = null;
        },
      //   setData: (state, action) => {
      //    state.data = action.payload;
      //   },
     },
    extraReducers: {
        [fetchAuth.pending]: (state) => {
            state.status = 'loading';
            state.data = null;
         },
         [fetchAuth.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
         },
         [fetchAuth.rejected]: (state) => {
            state.status = 'error';
            state.data = null;
         },
         [addToCart.pending]: (state) => {
            state.status = 'loading';
            state.data = null;
         },
         [addToCart.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
         },
         [addToCart.rejected]: (state) => {
            state.status = 'error';
            state.data = null;
         },
         [getUserCart.pending]: (state) => {
            state.status = 'loading';
            state.cartIt.items = null;
         },
         [getUserCart.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.cartIt.items = action.payload;
         },
         [getUserCart.rejected]: (state) => {
            state.status = 'error';
            state.cartIt.items = null;
         },
         [fetchRegister.pending]: (state) => {
            state.status = 'loading';
            state.data = null;
         },
         [fetchRegister.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
         },
         [fetchRegister.rejected]: (state) => {
            state.status = 'error';
            state.data = null;
         },
         [removeProductFromCart.pending]: (state) => {
            state.status = 'loading';
            state.data = null;
         },
         [removeProductFromCart.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
         },
         [removeProductFromCart.rejected]: (state) => {
            state.status = 'error';
            state.data = null;
         },
         [updateProductFromCart.pending]: (state) => {
            state.status = 'loading';
            state.data = null;
         },
         [updateProductFromCart.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
         },
         [updateProductFromCart.rejected]: (state) => {
            state.status = 'error';
            state.data = null;
         },
         [createOrder.pending]: (state) => {
            state.status = 'loading';
            state.data = null;
         },
         [createOrder.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
         },
         [createOrder.rejected]: (state) => {
            state.status = 'error';
            state.data = null;
         },
         [getUserWishList.pending]: (state) => {
            state.status = 'loading';
            state.data = null;
         },
         [getUserWishList.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
         },
         [getUserWishList.rejected]: (state) => {
            state.status = 'error';
            state.data = null;
         },
         [updateProfile.pending]: (state) => {
            state.status = 'loading';
            state.data = null;
         },
         [updateProfile.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
         },
         [updateProfile.rejected]: (state) => {
            state.status = 'error';
            state.data = null;
         },
   
     },
    
}); 

export const selectIsAuth = (state) => Boolean(state.auth.data);

export const authReducer = authSlice.reducer;
export const {logout} = authSlice.actions;