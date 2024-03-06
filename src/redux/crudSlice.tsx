import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  newProducts: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.newProducts.push(action.payload);
    },
    updateProduct: (state, action) => {
      const { id, updatedProduct } = action.payload;
      const index = state.newProducts.findIndex((product) => product.id === id);
      if (index !== -1) {
        state.newProducts[index] = updatedProduct;
      }
    },
    deleteProduct: (state, action) => {
      const { id } = action.payload;
      state.newProducts = state.newProducts.filter((product) => product.id !== id);
    },
  },
});

export const { addProduct, updateProduct, deleteProduct } = productSlice.actions;

export const selectProducts = (state) => state.products.products;

export default productSlice.reducer;
