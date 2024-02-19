import { configureStore } from '@reduxjs/toolkit'
import { bookApi } from './api/booksApi';

export const store = configureStore({
    reducer: {
        [bookApi.reducerPath]: bookApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(bookApi.middleware)
});