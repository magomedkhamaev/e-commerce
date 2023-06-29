import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: 0,
    price: '',
    color: '',
    sSize: '',
    mSize: '',
    // count: 1,
    // sort: {
    //     name: 'популярности',
    //     sortProperty: 'rating',
    // },
    sort: '-totalrating',
};

const filterSlice = createSlice({
     name: 'filters',
     initialState,
     reducers: {
        setPriceFrom(state, action) {
            state.value = action.payload;
        },
        setPriceTo(state, action) {
            state.price = action.payload;
        },
        setColorId(state, action) {
            state.color = action.payload;
        },
        setS(state, action) {
            state.sSize = action.payload;
        },
        setM(state, action) {
            state.mSize = action.payload;
        },
        setSort(state, action) {
            state.sort = action.payload;
        },
        // setCount(state, action) {
        //     state.count = action.payload;
        // },
     },
});

export const {setPriceFrom, setPriceTo, setColorId, setM, setS, setSort} = filterSlice.actions;

export default filterSlice.reducer;