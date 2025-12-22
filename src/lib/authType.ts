export interface LoginApiResponse {
  expires_in: number;
  token_type: string;
  token: string;
  message: string;
  status: boolean;
  data: {
    token: string;
    user: {
      id: number;
      full_name: string;
      email: string;
      stripe_account_id: string | null;
      email_verified_at: string | null;
      role: "USER" | "ADMIN" | string;
      status: "Active" | "Inactive" | string;
      otp_verified_at: string | null;
      otp: string | null;
      otp_expires_at: string | null;
      bio: string | null;
      contact_number: string | null;
      location: string | null;
      avatar: string | null;
      google_id: string | null;
      apple_id: string | null;
      created_at: string;
      updated_at: string;
    };
  };
}
export interface RegisterApiResponse {
  message: string;
  status: boolean;
}

export interface LoginApiPayloade {
  email: string;
  password: string;
  // role: string | number | undefined;
}
export interface RegisterApiPayloade {
  email: string;
  full_name: string;
  password: string;
  password_confirmation: string;
  role: string | undefined;
}

export interface OtpVerifyApiResponse {
  status: true;
  message: string;
  data: {
    token: string;
    user: {
      id: number;
      full_name: string;
      email: string;
      email_verified_at: string | null;
      phone_number: string | null;
      avatar: string | null;
      address: string | null;
      role: "USER" | string;
      status: "active" | "inactive" | string;
      created_at: string; // ISO datetime
      updated_at: string; // ISO datetime
      last_login_at: string | null;
      otp: string | null;
      otp_verified_at: string | null;
      otp_expires_at: string | null;
      google_id: string | null;
    };
  };
}

export interface OtpVerifyApiPayload {
  otp: string;
}
export interface RestOtpApiPayload {
  email: string;
}

export interface ResendOtpApiResponse {
  status: boolean;
  message: string;
  access_token: string;
}

export interface ChangePasswordApiResponse {
  message: string;
  status: boolean;
}

export interface ChangePasswordApiPayload {
  password: string;
  password_confirmation: string;
}

export interface logoutPasswordApiResponse {
  message: string;
  status: boolean;
}

export interface updatePasswordResponse {
  message: string;
  status: boolean;
}

export interface updatePasswordApiPayload {
  password: string;
  current_password: string;
  password_confirmation: string;
}

export interface UserProfileResponse {
  status: boolean;
  message: string;
  data: {
    token: string;
    user: {
      id: number;
      full_name: string;
      email: string;
      email_verified_at: string | null;
      phone_number: string | null;
      avatar: string | null;
      address: string | null;
      role: "USER" | string;
      status: "active" | "inactive" | string;
      created_at: string; // ISO datetime
      updated_at: string; // ISO datetime
      last_login_at: string | null;
      otp: string | null;
      otp_verified_at: string | null;
      otp_expires_at: string | null;
      google_id: string | null;
      avatar_url: string;
      level: number;
      profile: {
        id: number;
        user_id: number;
        user_name: string;
        total_points: number;
        level: number;
        used_points: number;
        business_name: string | null;
        category: string;
        description: string | null;
        business_hours: string | null;
        created_at: string; // ISO Date string
        updated_at: string;
      };
    };
  };
}

export interface RegisterValue {
  full_name: string;
  email: string;
  password: string;
  password_confirmation: string;
  role: string | undefined;
  phone_number: string;
  country_code: number | string;
}
export interface OTPValue {
  email: string;
}
export interface LoginValue {
  email: string;
  password: string;
  role: string | undefined;
}
export interface ConfirmationValue {
  password: string;
  password_confirmation: string;
}

export type Routes =
  | "/register"
  | "/change-password"
  | "/(tab)"
  | "/(auth)/create-new-password"
  | "/(tabs)"
  | "/store-manager/(tab)";

export interface LocationProps {
  setSelectedLocation: React.Dispatch<React.SetStateAction<any>>;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
  selectedLocation?: React.Dispatch<React.SetStateAction<string>>;
  isEmpty: boolean;
  address?: string;
}
