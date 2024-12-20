import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { apiSlice } from './apiSlice/apiSlice'


export const store = configureStore({
  reducer: {
    // Add the reducer here
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
 
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})


setupListeners(store.dispatch)