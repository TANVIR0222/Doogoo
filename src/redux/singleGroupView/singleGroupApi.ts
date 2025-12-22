import { GroupResponse } from "@/src/utils/rtkType";
import { api } from "../api/baseApi";

export const singleGroupApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getSingleGroup: builder.query<GroupResponse, any>({
      query: (id) => ({
        url: `/user/view-group/${id}`,
        method: "GET",
      }),
      providesTags: ["single-group"],
    }),
  }),
});

export const { useGetSingleGroupQuery } = singleGroupApi;
