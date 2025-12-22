import { api } from "../api/baseApi";

export const paymentApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    userPaymentInten: builder.mutation<any, any>({
      query: (userPaymentData) => ({
        url: `/user/payment-intent`,
        method: "POST",
        body: userPaymentData,
      }),
      invalidatesTags: ["payment"],
    }),
    userPaymentSuccess: builder.mutation<any, any>({
      query: (data) => ({
        url: `/user/payment-success`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["payment"],
    }),
  }),
});

export const { useUserPaymentIntenMutation, useUserPaymentSuccessMutation } =
  paymentApi;
