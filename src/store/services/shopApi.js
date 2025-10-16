import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const rtdbBaseUrl = process.env.EXPO_PUBLIC_BASE_URL_RTDB

export const shopApi = createApi({
    reducerPath: 'shopApi',
    baseQuery: fetchBaseQuery({ baseUrl: rtdbBaseUrl }),
    endpoints: (builder) => ({
        getProducts: builder.query({ query: () => "products.json" }),
    })
});

export const { useGetProductsQuery } = shopApi;
