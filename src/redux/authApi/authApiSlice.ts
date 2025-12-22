import {
  ChangePasswordApiPayload,
  ChangePasswordApiResponse,
  LoginApiPayloade,
  LoginApiResponse,
  OtpVerifyApiPayload,
  OtpVerifyApiResponse,
  RegisterApiPayloade,
  RegisterApiResponse,
  ResendOtpApiResponse,
  RestOtpApiPayload,
  updatePasswordApiPayload,
  updatePasswordResponse,
  UserProfileResponse,
} from "@/src/lib/authType";
import { api } from "../api/baseApi";

export const authApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // login
    userLogin: builder.mutation<LoginApiResponse, LoginApiPayloade>({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),

    // signUp
    userRegister: builder.mutation<RegisterApiResponse, RegisterApiPayloade>({
      query: (userData) => ({
        url: `/register`,
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["auth"],
    }),

    // verify OTP
    userVerifyOTP: builder.mutation<OtpVerifyApiResponse, OtpVerifyApiPayload>({
      query: (data) => ({
        url: `/verify-otp`,
        method: "POST",
        body: data,
      }),
    }),

    // resend OTP
    resendOTP: builder.mutation<ResendOtpApiResponse, RestOtpApiPayload>({
      query: (data) => ({
        url: `/resend-otp`,
        method: "POST",
        body: data,
      }),
    }),

    // forget password
    userPasswordChange: builder.mutation<
      updatePasswordResponse,
      updatePasswordApiPayload
    >({
      query: (data) => ({
        url: `/update-password`,
        method: "POST",
        body: data,
      }),
    }),

    // Change Password
    changePassword: builder.mutation<
      ChangePasswordApiResponse,
      ChangePasswordApiPayload
    >({
      query: (body) => {
        return {
          url: `/change-password`,
          method: "POST",
          body: body,
        };
      },
    }),

    // get profile
    userGetProfile: builder.query<UserProfileResponse, void>({
      query: () => ({
        url: `/get-profile`,
      }),
      providesTags: ["auth", "profie-update"],
    }),

    // update profile
    updateProfile: builder.mutation({
      query: (data) => ({
        url: `/profile-update?_method=PUT`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),

    // token validation check
    validateToken: builder.query({
      query: () => ({
        url: `/validate-token`,
      }),
    }),
    userLogout: builder.mutation({
      query: () => ({
        url: `/logout`,
        method: "POST",
      }),
    }),

    // other user profile data by id
    getOthersProfile: builder.query({
      query: ({ id }) => ({
        url: `/get-profile`,
        params: { user_id: id },
      }),
      providesTags: ["auth"],
    }),
    socialLogin: builder.mutation({
      query: (data) => ({
        url: `/social-login`,
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),
  }),
});

export const {
  useUserLoginMutation,
  useUserRegisterMutation,
  useUserVerifyOTPMutation,
  useResendOTPMutation,
  useUserPasswordChangeMutation,
  useChangePasswordMutation,
  useUserGetProfileQuery,
  useGetOthersProfileQuery,
  useUpdateProfileMutation,
  useValidateTokenQuery,
  useUserLogoutMutation,
  useSocialLoginMutation,
} = authApi;
