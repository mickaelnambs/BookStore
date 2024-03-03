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
                    page: params?.page,
                    keyword: params?.keyword,
                    category: params?.category,
                    ratings: params?.ratings,
                    "price[gte]": params.min,
                    "price[lte]": params.max,
                }
            })
        }),
        getBookDetails: builder.query({
            query: (id) => `/books/${id}`
        })
    }),
});

export const { useGetBooksQuery, useGetBookDetailsQuery } = bookApi;