import {
  AdvanceFeatureApiResponse,
  CalendarApiResponse,
  HabitTrackingResponse,
  SayNoApiResponse,
  SubscriptionResponse,
  SubscriptionsResponse,
} from "@/src/utils/rtkType";
import { api } from "../api/baseApi";

export const advanceFeaturesApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAdvanceUserData: builder.query<AdvanceFeatureApiResponse, void>({
      query: () => ({
        url: `/user/basic-info`,
        method: "GET",
      }),
      providesTags: [
        "advancedFeatures",
        "auth",
        "profie-update",
        "sayNo",
        "daly-add-habits",
        "challenges",
        "payment",
      ],
    }),
    getAdvanceUserSubscription: builder.query<SubscriptionsResponse, void>({
      query: () => ({
        url: `/user/get-subscriptions`,
      }),
      providesTags: ["advancedFeatures", "payment"],
    }),
    getAllhabitsCalander: builder.query<CalendarApiResponse, void>({
      query: () => ({
        url: `/user/habit-calendar`,
      }),
      providesTags: ["advancedFeatures", "payment"],
    }),
    getAllSayNoBarChart: builder.query<SayNoApiResponse, void>({
      query: () => ({
        url: `/user/say-no-bar-chart`,
      }),
      providesTags: ["advancedFeatures", "sayNo", "payment"],
    }),
    getAllHabitTrackingBarChart: builder.query<HabitTrackingResponse, void>({
      query: () => ({
        url: `/user/mode-track-line-graph`,
      }),
      providesTags: [
        "advancedFeatures",
        "challenges",
        "auth",
        "daly-add-habits",
        "payment",
      ],
    }),
    checkPremiumUser: builder.query<SubscriptionResponse, void>({
      query: () => ({
        url: `/user/premium-user-check`,
      }),
      providesTags: ["advancedFeatures", "payment"],
    }),
  }),
});

export const {
  useGetAdvanceUserDataQuery,
  useGetAdvanceUserSubscriptionQuery,
  useGetAllhabitsCalanderQuery,
  useGetAllSayNoBarChartQuery,
  useGetAllHabitTrackingBarChartQuery,
  useCheckPremiumUserQuery,
} = advanceFeaturesApi;
