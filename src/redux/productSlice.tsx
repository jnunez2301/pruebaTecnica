import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "./models/Product";
import { ProductState } from "./models/ProductState";
import axios from "axios";

const baseURL = 'http://localhost:3000/products'

const initialState: ProductState = {
    data: [],
    loading: 'idle',
    error: null
}

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await axios.get<Product[]>(baseURL);
    return response.data;
});

export const fetchProductById = createAsyncThunk('products/fetchProductById', async (productId: number) => {
    const response = await axios.get<Product>(`${baseURL}/${productId}`);
    return response.data;
});

export const addProduct = createAsyncThunk('products/addProduct', async (newProduct: Product) => {
    const response = await axios.post<Product>(baseURL, newProduct);
    return response.data; 
});
export const deleteProduct = createAsyncThunk('products/deleteProduct', async (productId: number) => {
    await axios.delete(`${baseURL}/${productId}`);
    return productId;
});

export const updateProduct = createAsyncThunk('products/updateProduct', async ({ productId, updatedProduct }: { productId: number, updatedProduct: Product }) => {
    const response = await axios.put<Product>(`${baseURL}/${productId}`, updatedProduct);
    return response.data;
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
            state.loading = 'fulfilled';
            state.data = action.payload;
        })
        .addCase(fetchProducts.rejected, (state, action) => {
            state.loading = 'rejected';
            state.error = action.error.message ?? 'An error ocurred while fetching data'
        })
        .addCase(addProduct.pending, (state) => {
            state.loading = 'pending';
        })
        .addCase(addProduct.fulfilled, (state, action) => {
            state.loading = 'fulfilled';
            state.data.push(action.payload); 
        })
        .addCase(addProduct.rejected, (state, action) => {
            state.loading = 'rejected';
            state.error = action.error.message ?? 'An error occurred while adding the product';
        })
        .addCase(fetchProductById.pending, (state) => {
            state.loading = 'pending';
        })
        .addCase(fetchProductById.fulfilled, (state, action) => {
            state.loading = 'fulfilled';
            state.data.push(action.payload);
        })
        .addCase(fetchProductById.rejected, (state, action) => {
            state.loading = 'rejected';
            state.error = action.error.message ?? 'An error occurred while fetching the product by ID';
        })
        .addCase(deleteProduct.pending, (state) => {
            state.loading = 'pending';
        })
        .addCase(deleteProduct.fulfilled, (state, action) => {
            state.loading = 'fulfilled';
            state.data = state.data.filter(product => product.id !== action.payload);
        })
        .addCase(deleteProduct.rejected, (state, action) => {
            state.loading = 'rejected';
            state.error = action.error.message ?? 'An error occurred while deleting the product';
        })
        .addCase(updateProduct.pending, (state) => {
            state.loading = 'pending';
        })
        .addCase(updateProduct.fulfilled, (state, action) => {
            state.loading = 'fulfilled';
            const updatedIndex = state.data.findIndex(product => product.id === action.payload.id);
            if (updatedIndex !== -1) {
                state.data[updatedIndex] = action.payload;
            }
        })
        .addCase(updateProduct.rejected, (state, action) => {
            state.loading = 'rejected';
            state.error = action.error.message ?? 'An error occurred while updating the product';
        })
    }
})


export default productSlice.reducer;