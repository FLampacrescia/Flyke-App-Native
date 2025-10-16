import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const rtdbBaseUrl = process.env.EXPO_PUBLIC_BASE_URL_RTDB

export const shopApi = createApi({
    reducerPath: 'shopApi',
    baseQuery: fetchBaseQuery({ baseUrl: rtdbBaseUrl }),
    endpoints: (builder) => ({
        getProducts: builder.query({ query: () => "products.json" }),
        getProductById: builder.query({
            query: (productId) => `products.json?orderBy="_id"&equalTo="${productId}"`,
            transformResponse: (response) => {
                const product = Object.values(response)[0];
                return product;
            },
        }),
    })
});

export const { useGetProductsQuery, useGetProductByIdQuery } = shopApi;
