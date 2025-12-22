import { NotificationsResponse, RewardPayloade } from "@/src/utils/rtkType";
import { api } from "../api/baseApi";

export const notificationsApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllNotifications: builder.query<NotificationsResponse, RewardPayloade>({
      query: ({ page, per_page }) => ({
        url: `/get-notifications`,
        method: "GET",
        params: {
          page,
          per_page,
        },
      }),
      providesTags: ["notifications", "challenges"],
    }),
    getAllNotificationsCount: builder.query<any, void>({
      query: () => ({
        url: `/notification-status`,
        method: "GET",
      }),
      providesTags: ["notifications"],
    }),
    // readSingleNotifications: builder.mutation<any, any>({
    //   query: ({ notification_id }) => ({
    //     url: `/read-all`,
    //     method: "PATCH",
    //     params: {
    //       notification_id,
    //     },
    //   }),
    //   invalidatesTags: ["notifications"],
    // }),
    readAllNotifications: builder.mutation<any, void>({
      query: () => ({
        url: `/read-all`,
        method: "PATCH",
      }),
      invalidatesTags: ["notifications"],
    }),
  }),
});

export const {
  useLazyGetAllNotificationsQuery,
  useReadAllNotificationsMutation,
  useGetAllNotificationsCountQuery,
} = notificationsApi;
