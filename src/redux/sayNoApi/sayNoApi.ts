import {
  EntryApiResponse,
  EntryPayloade,
  GetSayNoApiResponse,
  GetSayNoPayloade,
  HabitCompletedResponse,
} from "@/src/utils/rtkType";
import { api } from "../api/baseApi";

export const sayNoApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // login
    addEntryUser: builder.mutation<EntryApiResponse, EntryPayloade>({
      query: (data) => ({
        url: "/user/add-entry",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["sayNo"],
    }),
    getAllSayNo: builder.query<GetSayNoApiResponse, GetSayNoPayloade>({
      query: ({ page, per_page, duration }) => {
        // console.log(page, per_page, duration);

        return {
          url: "/user/get-entries",
          method: "GET",
          params: {
            page,
            per_page,
            filter: duration,
          },
        };
      },
      providesTags: ["sayNo"],
    }),

    deleteSayNo: builder.mutation<HabitCompletedResponse, any>({
      query: (id) => ({
        url: `/user/delete-entry/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["sayNo"],
    }),
  }),
});

export const {
  useAddEntryUserMutation,
  useLazyGetAllSayNoQuery,
  useDeleteSayNoMutation,
} = sayNoApi;
