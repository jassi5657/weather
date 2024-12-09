import { apiSlice } from "../apiSlice/apiSlice";

export const extendedApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      getWeather: builder.query({
        query: () => "/weather",
      }),
    }),
  })



  export const {
    useGetWeatherQuery
    

    
    } = extendedApi

