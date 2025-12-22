import {
  GetAllHabitsResponse,
  HabitApiPayloade,
  HabitApiResponse,
  HabitCompletedPayloade,
  HabitCompletedResponse,
  IsArchivedResponse,
} from "@/src/utils/rtkType";
import { api } from "../api/baseApi";

export const habitsApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // login

    userAddHabit: builder.mutation<HabitApiResponse, HabitApiPayloade>({
      query: (data) => ({
        url: "/user/add-new-habit",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["daly-add-habits"],
    }),

    getAllHabit: builder.query<GetAllHabitsResponse, void>({
      query: (data) => ({
        url: "/user/get-habits",
      }),
      providesTags: ["daly-add-habits"],
    }),
    getArchivedAddHabit: builder.query<
      IsArchivedResponse,
      { isArchived: number }
    >({
      query: ({ isArchived }) => ({
        url: "/user/get-habits",
        params: {
          isArchived,
        },
      }),
      providesTags: ["daly-add-habits"],
    }),
    completedHabit: builder.mutation<
      HabitCompletedResponse,
      HabitCompletedPayloade
    >({
      query: ({ habit_id }) => ({
        url: "/user/done-habit",
        method: "PATCH",
        params: {
          habit_id,
        },
      }),
      invalidatesTags: ["daly-add-habits"],
    }),
    archivedHabit: builder.mutation<
      HabitCompletedResponse,
      HabitCompletedPayloade
    >({
      query: ({ habit_id }) => ({
        url: "user/archived-habit",
        method: "PATCH",
        params: {
          habit_id,
        },
      }),
      invalidatesTags: ["daly-add-habits"],
    }),
    deleteArchivedHabit: builder.mutation<
      HabitCompletedResponse,
      HabitCompletedPayloade
    >({
      query: ({ habit_id }) => ({
        url: "/user/archived-habit",
        method: "PATCH",
        params: {
          habit_id,
        },
      }),
      invalidatesTags: ["daly-add-habits"],
    }),
    deleteHabit: builder.mutation<HabitCompletedResponse, any>({
      query: (id) => ({
        url: `/user/delete-habit/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["daly-add-habits"],
    }),
  }),
});

export const {
  useUserAddHabitMutation,
  useGetAllHabitQuery,
  useCompletedHabitMutation,
  useArchivedHabitMutation,
  useDeleteHabitMutation,
  useGetArchivedAddHabitQuery,
  useDeleteArchivedHabitMutation,
} = habitsApi;
