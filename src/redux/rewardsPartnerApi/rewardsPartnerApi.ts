import {
  CheckAlldataFilledOrNotResponse,
  CompaletedRedemptionPayloade,
  CompletedRedemptionResponse,
  CreateRewardPayload,
  RewardDetailsResponse,
  RewardHistoryDetailsApiResponse,
  RewardPayloade,
  RewardsHistoryResponse,
} from "@/src/utils/rtkType";
import { api } from "../api/baseApi";

export const rewardsPartnerApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllRewardHistory: builder.query<RewardsHistoryResponse, RewardPayloade>({
      query: ({ page, per_page }) => {
        return {
          url: "/partner/get-rewards",
          method: "GET",
          params: {
            page,
            per_page,
          },
        };
      },
      providesTags: ["rewards-partner"],
    }),
    singleRewardPost: builder.mutation<
      RewardHistoryDetailsApiResponse,
      CreateRewardPayload
    >({
      query: (formData) => {
        return {
          url: `/partner/add-reward`,
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: formData,
        };
      },
      invalidatesTags: ["rewards-partner"],
    }),
    updateSingleRewardPost: builder.mutation<
      RewardHistoryDetailsApiResponse,
      { id: number; formData: FormData }
    >({
      query: ({ id, formData }) => {
        // console.log("-------------", id, formData);

        return {
          url: `/partner/edit-reward/${id}`,
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: formData,
        };
      },
      invalidatesTags: ["rewards-partner"],
    }),

    servicesEnableDisable: builder.mutation<
      CompletedRedemptionResponse,
      CompaletedRedemptionPayloade
    >({
      query: ({ id }) => ({
        url: `/partner/enable-disable-reward/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["rewards-partner"],
    }),

    checkAlldataFilledOrNot: builder.query<
      CheckAlldataFilledOrNotResponse,
      void
    >({
      query: () => ({
        url: `/partner/check-profile-completion`,
      }),
      providesTags: ["rewards-partner", "profie-update"],
    }),
    viewReward: builder.query<RewardDetailsResponse, { id: number }>({
      query: ({ id }) => ({
        url: `/partner/view-reward/${id}`,
      }),
      providesTags: ["rewards-partner", "profie-update"],
    }),
    deleteReward: builder.mutation<
      CheckAlldataFilledOrNotResponse,
      { id: number }
    >({
      query: ({ id }) => ({
        url: `/partner/delete-reward/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["rewards-partner", "profie-update"],
    }),
  }),
});

export const {
  useLazyGetAllRewardHistoryQuery,
  useGetAllRewardHistoryQuery,
  useSingleRewardPostMutation,
  useCheckAlldataFilledOrNotQuery,
  useServicesEnableDisableMutation,
  useDeleteRewardMutation,
  useViewRewardQuery,
  useUpdateSingleRewardPostMutation,
} = rewardsPartnerApi;
