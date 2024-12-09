import { apiSlice } from "../apiSlice/apiSlice";

export const extendedApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      getAllUsers: builder.query({
        query: () => "/users",
        providesTags: ['User'],
      }),

    
      
    
    
      addUser: builder.mutation({
        query: (body) => ({
          url: "/users",
          method: "POST",
          body,
        })
      }),
      invalidatesTags: ['User'],
  



    login: builder.mutation({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body: body,
      }),
    }),
  }),



  


    

  })



  export const {
    useGetAllUsersQuery,
    
    useAddUserMutation,
    useLoginMutation,
   
    
    } = extendedApi

