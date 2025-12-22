import { api } from "../api/baseApi";

export const profileApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    userProfileUpdate: builder.mutation<any, any>({
      query: (formData) => ({
        url: `/edit-profile`,
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      }),
      invalidatesTags: ["profie-update"],
    }),
  }),
});

export const { useUserProfileUpdateMutation } = profileApi;
