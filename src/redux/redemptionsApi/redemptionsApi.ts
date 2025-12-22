import {
  CompaletedRedemptionPayloade,
  CompletedRedemptionResponse,
  RedemptionDetailsApiResponse,
  RedemptionsApiResponse,
  RedemptionsDetailsPayloade,
  RedemptionsNoPayloade,
} from "@/src/utils/rtkType";
import { api } from "../api/baseApi";

export const redemptionsApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllRedemptions: builder.query<
      RedemptionsApiResponse,
      RedemptionsNoPayloade
    >({
      query: ({ page, per_page }) => {
        return {
          url: "/partner/get-redeem-history",
          method: "GET",
          params: {
            page,
            per_page,
          },
        };
      },
      providesTags: ["redemptions", "redeem"],
    }),
    getSinglaeRedemptionHistory: builder.query<
      RedemptionDetailsApiResponse,
      RedemptionsDetailsPayloade
    >({
      query: ({ id }) => ({
        url: `/partner/get-redemption-details/${id}`,
      }),
      providesTags: ["redemptions"],
    }),
    compaletedRedemptionPartnerDetails: builder.mutation<
      CompletedRedemptionResponse,
      CompaletedRedemptionPayloade
    >({
      query: ({ id }) => ({
        url: `/partner/mark-as-redeemed/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["redeem"],
    }),
  }),
});

export const {
  useGetAllRedemptionsQuery,
  useLazyGetAllRedemptionsQuery,
  useGetSinglaeRedemptionHistoryQuery,
  useCompaletedRedemptionPartnerDetailsMutation,
} = redemptionsApi;
