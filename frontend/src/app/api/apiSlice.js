import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {setCredentials} from "../../features/auth/authSlice.js";

/**
 * Creates an API slice using the given configuration.
 *
 * @param {Object} config - The configuration object for creating the API slice.
 * @param {Object} config.baseQuery - The base query object used for making API requests.
 * @param {string} config.baseQuery.baseUrl - The base URL for the API requests.
 * @param {string[]} config.tagTypes - The types of tags available for the API requests.
 * @param {Function} config.endpoints - The function that takes a builder object and returns an object of API endpoints.
 *
 * @returns {Object} - The API slice object with configured endpoints.
 */
const baseQuery = fetchBaseQuery({
    baseUrl: 'https://technotes-api-fs.onrender.com',
    credentials: 'include',
    prepareHeaders: (headers,{ getState }) => {
        const token = getState().auth.token

        if (token) {
            headers.set('authorization',`Bearer ${token}`)
        }

        return headers
    }
})

const baseQueryWithReauth = async  (args,api,extraOptions) => {
    // console.log(args) // request url, method, body
    // console.log(api) // signal, dispatch, getState()
    // console.log(extraOptions) // custom like {short: true}

    let result = await baseQuery(args,api, extraOptions)

    // If you want, handle other status too
    if (result?.error?.status === 403){
        console.log('sending refresh token')

        //Send refresh token to get new access token
        const refreshResult = await baseQuery('/auth/refresh', api,extraOptions)

        if (refreshResult?.data) {

            //store the new token
            api.dispatch(setCredentials({...refreshResult.data}))

            // retry original query with new access token
            result = await  baseQuery(args,api, extraOptions)
        } else {

            if (refreshResult?.error?.stats === 403) {

                refreshResult.error.data.message = 'Your login has expired.'

            }
            return refreshResult
        }
    }

    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes:['Note','Users'],
    endpoints: builder => ({

    })
})