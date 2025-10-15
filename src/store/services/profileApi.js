import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const rtdbBaseUrl = process.env.EXPO_PUBLIC_BASE_URL_RTDB;

export const profileApi = createApi({
    reducerPath: "profileApi",
    baseQuery: fetchBaseQuery({ baseUrl: rtdbBaseUrl }),
    tagTypes: ['profileImage', 'userProfile'],
    endpoints: (builder) => ({
        getProfilePicture: builder.query({
            query: (localId) => `profilePictures/${localId}.json`,
            providesTags: ['profileImage']
        }),
        putProfilePicture: builder.mutation({
            query: ({ localId, image }) => ({
                url: `profilePictures/${localId}.json`,
                method: 'PUT',
                body: { image },
            }),
            invalidatesTags: ['profileImage']
        }),
        // Mantenemos la mutación para crear el perfil, pero adaptada a fetchBaseQuery
        createUserProfile: builder.mutation({
            query: ({ localId, profileData }) => ({
                url: `/users/${localId}.json`,
                method: 'PUT',
                body: profileData,
            }),
            invalidatesTags: ['userProfile']
        }),
        // Endpoint para obtener los datos del perfil de usuario
        getUserProfile: builder.query({
            query: (localId) => `/users/${localId}.json`,
            providesTags: ['userProfile']
        }),
    })
});

export const { 
    useGetProfilePictureQuery, 
    usePutProfilePictureMutation,
    useCreateUserProfileMutation,
    useGetUserProfileQuery
} = profileApi;
