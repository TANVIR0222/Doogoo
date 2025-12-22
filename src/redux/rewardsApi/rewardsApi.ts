import {
  AvailableRewardsPayloade,
  AvailableRewardsRadiosResponse,
  CompaletedRedemptionPayloade,
  CompletedRedemptionResponse,
  RedeemHistoryResponse,
  RedemptionApiResponse,
  ViewAvailableRedemptionPayloade,
  ViewAvailableRewardPayloade,
  ViewAvailableRewardResponse,
} from "@/src/utils/rtkType";
import { api } from "../api/baseApi";

export const rewardsApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllAvailableRewards: builder.query<
      AvailableRewardsRadiosResponse,
      AvailableRewardsPayloade
    >({
      query: ({ page, per_page, search, radius }) => ({
        url: `/user/get-available-rewards`,
        params: {
          page,
          per_page,
          search: search,
          radius: radius,
        },
      }),
      providesTags: ["redeem"],
    }),
    getAllRedeemHistroy: builder.query<RedeemHistoryResponse, any>({
      query: ({ page, per_page, search }) => ({
        url: `/user/get-redeem-history`,
        params: {
          page,
          per_page,
          search: search,
        },
      }),
      providesTags: ["redeem"],
    }),
    redeemAvailableRewards: builder.mutation<any, any>({
      query: ({ reward_id }) => ({
        url: `/user/redeem-reward`,
        method: "PATCH",
        params: {
          reward_id: reward_id,
        },
      }),
      invalidatesTags: ["redeem"],
    }),
    viewAvailableRewards: builder.query<
      ViewAvailableRewardResponse,
      ViewAvailableRewardPayloade
    >({
      query: ({ id }) => ({
        url: `/user/view-reward/${id}`,
      }),
      providesTags: ["redeem"],
    }),

    viewAvailableRedemptionDetails: builder.query<
      RedemptionApiResponse,
      ViewAvailableRedemptionPayloade
    >({
      query: ({ id }) => ({
        url: `/user/get-redemption-details/${id}`,
      }),
      providesTags: ["redeem"],
    }),

    compaletedRedemptionDetails: builder.mutation<
      CompletedRedemptionResponse,
      CompaletedRedemptionPayloade
    >({
      query: ({ id }) => ({
        url: `/user/mark-as-completed/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["redeem"],
    }),
  }),
});

export const {
  useLazyGetAllAvailableRewardsQuery,
  useViewAvailableRewardsQuery,
  useRedeemAvailableRewardsMutation,
  useLazyGetAllRedeemHistroyQuery,
  useViewAvailableRedemptionDetailsQuery,
  useCompaletedRedemptionDetailsMutation,
} = rewardsApi;
