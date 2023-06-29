import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth";
import { prodCatReducer } from "./slices/prodCat";
import { productsReducer } from "./slices/product";
// import { wishReducer } from "./slices/wish";
// import { colorReducer } from "./slices/color";
// import { cartReducer } from "./slices/cart";
import { orderReducer } from "./slices/order";
import { commentReducer } from "./slices/comment";
// import filter from "./slices/filterSlice";
import filter from "./slices/filters"; 

const store = configureStore({
    reducer: {
        filter,
        products: productsReducer,
        // colors: colorReducer,  
        auth: authReducer,
        prodCat: prodCatReducer,
        // cart: cartReducer,
        // wish: wishReducer, 
        order: orderReducer,
        comment: commentReducer 
    },
});

export default store;