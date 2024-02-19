import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const bookApi = createApi({
    reducerPath: 'bookApi',
    baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
    keepUnusedDataFor: 30,
    endpoints: (builder) => ({
        getBooks: builder.query({
            query: (params) => "/books"
        }),
    }),
});

export const { useGetBooksQuery } = bookApi;