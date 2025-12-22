import {
  CelebrationPayloade,
  ChallengeResponse,
  CompletedApiResponse,
  CompletedPayloade,
  DailyGroupSummaryResponse,
  FriendPayloade,
  FriendResponse,
  GroupResponse,
  InvitePayloade,
  MyAllChallengeResponse,
} from "@/src/utils/rtkType";
import { api } from "../api/baseApi";

export const paymentApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllChalanges: builder.query<ChallengeResponse, void>({
      query: () => ({
        url: `/get-challenge-type-lists`,
        method: "GET",
      }),
      providesTags: ["challenges"],
    }),
    createdGroup: builder.mutation<any, any>({
      query: (payload) => ({
        url: `/user/create-group`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["challenges"],
    }),
    getAllChallengeGroups: builder.query<GroupResponse, any>({
      query: ({ page, per_page, search }) => {
        // console.log(page, per_page, duration);

        return {
          url: "/user/get-groups",
          method: "GET",
          params: {
            page,
            per_page,
            search: search,
          },
        };
      },
      providesTags: ["challenges"],
    }),
    getAllGroups: builder.query<GroupResponse, any>({
      query: ({ page, per_page, search }) => {
        // console.log(page, per_page, duration);

        return {
          url: "/user/get-active-groups",
          method: "GET",
          params: {
            page,
            per_page,
            search: search,
          },
        };
      },
      providesTags: ["challenges"],
    }),

    getAllCOmpletedGroups: builder.query<
      CompletedApiResponse,
      CompletedPayloade
    >({
      query: ({ page, per_page }) => {
        // console.log(page, per_page, duration);
        return {
          url: "/user/get-my-completed-groups",
          method: "GET",
          params: {
            page,
            per_page,
          },
        };
      },
      providesTags: ["challenges"],
    }),
    userJoinGroup: builder.mutation<any, number>({
      query: (challenge_group_id) => ({
        url: `/user/join-group`,
        method: "POST",
        body: { challenge_group_id }, //
      }),
      invalidatesTags: ["challenges"],
    }),
    userLogProgressGroup: builder.mutation<any, number>({
      query: (challenge_group_id) => ({
        url: `/user/log-progress`,
        method: "POST",
        body: { challenge_group_id }, //
      }),
      invalidatesTags: ["challenges"],
    }),
    userCelebrateSingle: builder.mutation<
      any,
      { id: number | string | undefined }
    >({
      query: ({ id }) => ({
        url: `/user/send-celebration`,
        method: "POST",
        params: {
          user_id: id,
        },
        body: { id }, //
      }),
      invalidatesTags: ["challenges"],
    }),
    getTodayLogsGroup: builder.query<any, number>({
      query: (id) => ({
        url: `/user/get-today-logs?challenge_group_id=${id}`,
      }),
      providesTags: ["challenges"],
    }),
    getAllJointGroup: builder.query<any, void>({
      query: () => ({
        url: `/user/group-array`,
      }),
      providesTags: ["challenges"],
    }),
    getTodayLogsAllUserdataGroup: builder.query<any, { id: number | string }>({
      query: ({ id }) => ({
        url: `/user/get-today-logs`,
        params: {
          challenge_group_id: id,
        },
      }),
      providesTags: ["challenges"],
    }),
    getDailyGroupSammary: builder.query<
      any,
      { id: number | string; day: string }
    >({
      query: ({ id, day }) => ({
        url: `/user/get-daily-summaries`,
        params: {
          challenge_group_id: id,
          day,
        },
      }),
      providesTags: ["challenges"],
    }),
    getDailyGroupOverallProgrees: builder.query<any, { id: number | string }>({
      query: ({ id }) => ({
        url: `/user/get-overall-progress`,
        params: {
          challenge_group_id: id,
        },
      }),
      providesTags: ["challenges"],
    }),
    getCelebrationUserId: builder.query<any, CelebrationPayloade>({
      query: ({ id, con_user_id }) => ({
        url: `/user/view-celebration-member`,
        params: {
          challenge_group_id: id,
          user_id: con_user_id,
        },
      }),
      providesTags: ["challenges"],
    }),
    groupTaskCompleted: builder.mutation<
      DailyGroupSummaryResponse,
      { id: number | string }
    >({
      query: ({ id }) => ({
        url: `/user/task-completed?challenge_log_id=${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["challenges"],
    }),
    getAllJointUser: builder.query<FriendResponse, FriendPayloade>({
      query: ({ page, per_page, search }) => {
        // console.log(page, per_page, duration);

        return {
          url: "/user/get-users",
          method: "GET",
          params: {
            page,
            per_page,
            search: search,
          },
        };
      },
      providesTags: ["challenges"],
    }),

    getAllMyChallangeUser: builder.query<
      MyAllChallengeResponse,
      FriendPayloade
    >({
      query: ({ page, per_page }) => {
        return {
          url: "/user/my-group-lists",
          method: "GET",
          params: {
            page,
            per_page,
          },
        };
      },
      providesTags: ["challenges"],
    }),
    invitedFriend: builder.mutation<any, InvitePayloade>({
      query: ({ user_id, challenge_group_id }) => {
        return {
          url: "/user/send-invite",
          method: "POST",
          params: {
            user_id,
            challenge_group_id,
          },
        };
      },
      invalidatesTags: ["challenges"],
    }),
  }),
});

export const {
  useGetAllChalangesQuery,
  useCreatedGroupMutation,
  useLazyGetAllGroupsQuery,
  useUserJoinGroupMutation,
  useUserLogProgressGroupMutation,
  useGetTodayLogsGroupQuery,
  useGetAllJointGroupQuery,
  useGetTodayLogsAllUserdataGroupQuery,
  useGroupTaskCompletedMutation,
  useGetDailyGroupSammaryQuery,
  useGetDailyGroupOverallProgreesQuery,
  useLazyGetAllCOmpletedGroupsQuery,
  useGetCelebrationUserIdQuery,
  useUserCelebrateSingleMutation,
  useLazyGetAllChallengeGroupsQuery,
  useLazyGetAllJointUserQuery,
  useLazyGetAllMyChallangeUserQuery,
  useInvitedFriendMutation,
} = paymentApi;
