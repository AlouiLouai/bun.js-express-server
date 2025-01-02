import { createSlice } from '@reduxjs/toolkit';
import { saveProductAction } from './productActions';
import { ProductState } from '@/types/product';

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

export const ProductSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // Optionally include synchronous reducers for local state management
    resetProducts: (state) => {
      state.products = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle the pending state for `saveProductAction`
      .addCase(saveProductAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Handle the fulfilled state for `saveProductAction`
      .addCase(saveProductAction.fulfilled, (state, action) => {
        state.products.push(action.payload); // Add the saved product to the list
        state.loading = false;
      })
      // Handle the rejected state for `saveProductAction`
      .addCase(saveProductAction.rejected, (state, action) => {
        state.error = action.payload as string; // Use the custom error message from `rejectWithValue`
        state.loading = false;
      });
  },
});

// Export synchronous reducer actions (if any)
export const { resetProducts } = ProductSlice.actions;

// Export the reducer
export default ProductSlice.reducer;
