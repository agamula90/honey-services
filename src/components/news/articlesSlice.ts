import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Article } from './articles';

export interface ArticlesSlice {
    loading: boolean;
    data: Article[];
}

const initialState: ArticlesSlice = {
    loading: true,
    data: [],
};

export const articlesSlice = createSlice({
    name: 'articles',
    initialState,
    reducers: {
        set: (state, action: PayloadAction<Article[]>) => {
            state.data = action.payload;
            state.loading = false;
        },
    },
});

// Action creators are generated for each case reducer function
export const { set } = articlesSlice.actions;

export default articlesSlice.reducer;

export const articlesQuery = `
    query getArticles {
        articles {
            title
            href
        }
    }`;
