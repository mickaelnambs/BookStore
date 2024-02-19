import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const bookApi = createApi({
    reducerPath: 'bookApi',
    baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
    keepUnusedDataFor: 30,
    endpoints: (builder) => ({
        getBooks: builder.query({
            query: (params) => ({
                url: "/books",
                params: {
                    page: params?.page
                }
            })
        }),
        getBookDetails: builder.query({
            query: (id) => `/books/${id}`
        })
    }),
});

export const { useGetBooksQuery, useGetBookDetailsQuery } = bookApi;