import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AsideItem } from './asideItems';

export interface AsideItemsSlice {
    loading: boolean;
    data: AsideItem[];
}

const initialState: AsideItemsSlice = {
    loading: true,
    data: [],
};

export const asideItemsSlice = createSlice({
    name: 'asideItems',
    initialState,
    reducers: {
        set: (state, action: PayloadAction<AsideItem[]>) => {
            state.data = action.payload;
            state.loading = false;
        },
    },
});

// Action creators are generated for each case reducer function
export const { set } = asideItemsSlice.actions;

export const asideItemsQuery = `
    query getSupplementaryContentItems {
        supplementaryContentItems {
            text
            imageUrl
            imageDescription
        }
    }
`;

export default asideItemsSlice.reducer;
