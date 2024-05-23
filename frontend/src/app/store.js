import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice.js";
import {setupListeners} from "@reduxjs/toolkit/query";
import authReducer from "../features/auth/authSlice.js";
/**
 * Configures the store with the given parameters.
 *
 * @param {Object} options - The options for configuring the store.
 * @param {Object} options.reducer - The reducer object for configuring the store's state.
 * @param {Function} options.middleware - The middleware function for handling actions.
 * @param {boolean} options.devTools - Flag indicating whether to enable the store's dev tools.
 * @returns {Object} - The configured store object.
 */
export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]:apiSlice.reducer,
        auth: authReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})
setupListeners(store.dispatch)
