import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from './products';

export interface ProductsState {
    loading: boolean;
    data: Product[];
}

const initialState: ProductsState = {
    loading: true,
    data: [],
};

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        set: (state, action: PayloadAction<Product[]>) => {
            state.data = action.payload;
            state.loading = false;
        },
    },
});

// Action creators are generated for each case reducer function
export const { set } = productsSlice.actions;

export default productsSlice.reducer;

export const productsQuery = `
    query getProducts {
        products {
            id
            title
            imageUrl
            description
            types
            volumes
        }
    }`;
