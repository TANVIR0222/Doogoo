import { api } from "../api/baseApi";

export const contactApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getContact: builder.query({
      query: (params) => {
        // console.log("📦 Sending contact sync request with params:", params); // <-- Debug log
        return {
          url: "/syn-contacts",
          method: "GET",
          params,
        };
      },
      providesTags: ["contact"],
    }),
  }),
});

export const { useGetContactQuery } = contactApi;
