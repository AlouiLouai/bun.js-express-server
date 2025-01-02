import { createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '@/types/product';
import ProductService from '@/services/product.services';

// Type for the error response
type SaveProductError = string | { message: string };

// Thunk action for saving a product
export const saveProductAction = createAsyncThunk<Product, Partial<Product>, { rejectValue: SaveProductError }>(
  'product/saveProduct',
  async (productData, { rejectWithValue }) => {
    try {
      const productService = new ProductService();
      const response = await productService.saveProduct(productData);
      return response; // Directly return the Product object
    } catch (error: unknown) {
      console.error('Error in saveProductAction:', error);

      // Type-safe error handling
      if (error instanceof Error) {
        return rejectWithValue(error.message || 'An unknown error occurred');
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);
