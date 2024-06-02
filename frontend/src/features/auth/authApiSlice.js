import { apiSlice } from "../../app/api/apiSlice";
import { logOut, setCredentials, signUp } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    sendLogout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("Send logut", data);
          setTimeout(() => {
            dispatch(logOut());
            dispatch(apiSlice.util.resetApiState());
          }, 500);
        } catch (err) {
          console.log(err);
        }
      },
    }),
    signup: builder.mutation({
      query: (credentials) => ({
        url: "/auth/signup",
        method: "POST",
        body: { ...credentials },
      }),
      /*
                     Login  after signup,but I think it's better if it throws new users on login page instead
                                                      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                                                        try {
                                                          const { data } = await queryFulfilled;
                                                          console.log("Send login", data);
                                                          setTimeout(() => {
                                                            dispatch(setCredentials());
                                                          }, 3000);
                                                        } catch (err) {
                                                          console.log(err);
                                                        }
                                                      },
             */
    }),
    refresh: builder.mutation({
      query: () => ({
        url: "/auth/refresh",
        method: "GET",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("accesstoken", data);
          const { accessToken } = data;
          dispatch(setCredentials({ accessToken }));
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useSendLogoutMutation,
  useRefreshMutation,
  useSignupMutation,
} = authApiSlice;
