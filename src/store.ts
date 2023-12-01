import { configureStore } from '@reduxjs/toolkit';
import contentItemsReducer from './components/main/contentItemsSlice';
import asideItemsReducer from './components/main/asideItemsSlice';
import articlesReducer from './components/news/articlesSlice';
import productsReducer from './components/products/productsSlice';
import navigationReducer from './components/navigationSlice';

export const store = configureStore({
    reducer: {
        contentItems: contentItemsReducer,
        asideItems: asideItemsReducer,
        articles: articlesReducer,
        products: productsReducer,
        navigation: navigationReducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type Environment = 'prod' | 'dev' | 'local';
const environment: Environment = 'local' as Environment;

function getEnvironmentBaseUrl(): string {
    switch (environment) {
        case 'prod':
            return 'http://54.170.25.224:8080';
        case 'dev':
            return 'http://3.250.40.230:8080';
        case 'local':
            return 'http://localhost:8080';
    }
}

export const baseUrl = getEnvironmentBaseUrl();

export const cacheTimeoutMillis = 60000;
