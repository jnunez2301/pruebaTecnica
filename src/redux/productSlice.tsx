import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "./models/Product";
import { ProductState } from "./models/ProductState";
import axios from "axios";

const baseURL = 'https://dummyjson.com/products'

const initialState: ProductState = {
    data: [],
    loading: 'idle',
    error: null
}

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await axios.get<Product[]>(baseURL);
    return response.data.products;
});

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchProducts.pending, (state) => {
            state.loading = 'pending'
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = 'fullfilled';
            state.data = action.payload;
        })
        .addCase(fetchProducts.rejected, (state, action) => {
            state.loading = 'rejected';
            state.error = action.error.message ?? 'An error ocurred while fetching data'
        })
    }
})


export default productSlice.reducer;