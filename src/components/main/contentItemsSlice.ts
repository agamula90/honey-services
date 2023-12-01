import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ContentItem } from './contentItems';

export interface ContentItemsSlice {
    loading: boolean;
    data: ContentItem[];
}

const initialState: ContentItemsSlice = {
    loading: true,
    data: [],
};

export const contentItemsSlice = createSlice({
    name: 'contentItems',
    initialState,
    reducers: {
        set: (state, action: PayloadAction<ContentItem[]>) => {
            state.data = action.payload;
            state.loading = false;
        },
    },
});

// Action creators are generated for each case reducer function
export const { set } = contentItemsSlice.actions;

export default contentItemsSlice.reducer;

export const contentItemsQuery = `
    query getContentItems {
        contentItems {
            text
            imageUrl
            imageDescription
        }
    }
`;
