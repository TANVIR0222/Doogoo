export type HabitApiPayloade = {
  habit_name: string;
};
export interface HabitApiResponse {
  status: boolean;
  message: string;
  data: HabitData;
}
export interface HabitData {
  user_id: number;
  habit_name: string;
  updated_at: string; // ISO date string
  created_at: string; // ISO date string
  id: number;
}

// Habit model
export interface Habit {
  id: number;
  user_id: number;
  habit_name: string;
  isArchived: number; // 1 = archived, 0 = active
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}

// API response for fetching all habits
export interface GetAllHabitsResponse {
  status: boolean;
  message: string;
  data: Habit[];
}

export interface HabitCompletedResponse {
  status: boolean;
  message: string;
  data: {
    habit_id: number;
    user_id: number;
    status: "Completed" | "Pending" | "Skipped";
    done_at: string;
    updated_at: string;
    created_at: string;
    id: number;
  };
}
export interface HabitCompletedPayloade {
  habit_id: number;
}
export interface EntryPayloade {
  say_no: string;
}
export interface EntryApiResponse {
  status: boolean;
  message: string;
  data: {
    user_id: number;
    date: number;
    say_no: string;
    updated_at: number;
    created_at: number;
    id: number;
  };
}

export interface HabitLog {
  id: number;
  habit_id: number;
  user_id: number;
  status: string; // "Completed" etc.
  done_at: string;
  created_at: string;
  updated_at: string;
}

export interface ArchivedHabit {
  id: number;
  user_id: number;
  habit_name: string;
  isArchived: number; // 0 = active, 1 = archived
  created_at: string;
  updated_at: string;
  logs: HabitLog[];
}

export interface IsArchivedResponse {
  status: boolean;
  message: string;
  data: ArchivedHabit[];
}

export interface Entry {
  id: number;
  user_id: number;
  date: string;
  say_no: string;
  created_at: string;
  updated_at: string;
}

export interface Pagination<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface GetSayNoApiResponse {
  status: boolean;
  message: string;
  data: Pagination<Entry>;
}
export interface GetSayNoPayloade {
  page: number;
  per_page: number;
  duration: string;
}
export interface RedemptionsNoPayloade {
  page: number;
  per_page: number;
  search: string;
}
export interface RewardPayloade {
  page: number;
  per_page: number;
}
export interface RedemptionsDetailsPayloade {
  id: number | string;
}

export interface AvailableReward {
  id: number;
  partner_id: number;
  title: string;
  challenge_type: string;
  description: string;
  expiration_date: string; // ISO date string
  purchase_point: number;
  status: string;
  admin_approved: number;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  business_name: string | null;
}

export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface AvailableRewardsData {
  current_page: number;
  data: AvailableReward[];
  first_page_url: string;
  from: number | null;
  last_page: number;
  per_page: number;
  prev_page_url: string | null;
  to: number | null;
  total: number;
}

export interface AvailableRewardsResponse {
  status: boolean;
  message: string;
  data: AvailableRewardsData;
}
export interface AvailableRewardsPayloade {
  page: number;
  per_page: number;
  search: string;
  radius: number;
}
export interface CompletedPayloade {
  page: number;
  per_page: number;
}

export interface ViewAvailableReward {
  id: number;
  partner_id: number;
  title: string;
  challenge_type: string;
  description: string;
  expiration_date: string; // ISO date string
  purchase_point: number;
  status: string;
  admin_approved: number;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  business_name: string | null;
  already_redeemed: boolean;
}

export interface ViewAvailableRewardResponse {
  status: boolean;
  message: string;
  data: ViewAvailableReward;
}

export interface ViewAvailableRewardPayloade {
  id: number;
}
export interface ViewAvailableRedemptionPayloade {
  id: number;
}
export interface CompaletedRedemptionPayloade {
  id: number;
}

export interface RedeemHistoryResponse {
  status: boolean;
  message: string;
  data: RedeemHistoryPagination;
}

export interface RedeemHistoryPagination {
  current_page: number;
  data: RedeemHistory[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface RedeemHistory {
  id: number;
  user_id: number;
  reward_id: number;
  partner_id: number;
  date: string; // e.g. "2025-09-20 08:59:24"
  code: string;
  status: string; // "Pending", "Approved", etc.
  created_at: string;
  updated_at: string;
  reward: Reward;
  user: {
    id: number;
    full_name: string;
    avatar_url: string;
  };
}

export interface Reward {
  id: number;
  partner_id: number;
  title: string;
  partner: Partner;
}

export interface Partner {
  id: number;
  full_name: string;
  role: string; // "PARTNER"
  address: string | null;
  phone_number: string | null;
  avatar_url: string;
  profile: PartnerProfile;
}

export interface PartnerProfile {
  id: number;
  user_id: number;
  user_name: string | null;
  business_name: string | null;
  category: string | null;
  description: string | null;
  business_hours: string | null;
}

export interface AdvanceFeatureApiResponse {
  status: boolean;
  message: string;
  data: {
    user: {
      id: number;
      full_name: string;
      role: "USER" | "PARTNER" | string;
      avatar_url: string;
    };
    level: number;
    total_points: number;
    used_points: number;
    remaining_points: number;
    completed_habit: number;
    longest_streaks_avg: number;
    longest_streaks_max: number;
    longest_streak_month: string;
    completed_group_challenge: number;
    say_no: number;
  };
}

export interface RedemptionApiResponse {
  status: boolean;
  message: string;
  data: {
    id: number;
    user_id: number;
    reward_id: number;
    partner_id: number;
    date: string; // "2025-09-20 10:15:11"
    code: string;
    status: "Pending" | "Completed" | string;
    created_at: string;
    updated_at: string;
    reward: {
      id: number;
      partner_id: number;
      title: string;
      partner: {
        id: number;
        full_name: string;
        role: "PARTNER" | "USER" | string;
        address: string | null;
        phone_number: string | null;
        avatar_url: string;
        profile: {
          id: number;
          user_id: number;
          user_name: string | null;
          business_name: string | null;
          category: string | null;
          description: string | null;
          business_hours: string | null;
        };
      };
    };
  };
}

export interface CompletedRedemptionData {
  id: number;
  user_id: number;
  reward_id: number;
  partner_id: number;
  date: string;
  code: string;
  status: "Completed" | "Pending" | string;
  created_at: string;
  updated_at: string;
}

export interface CompletedRedemptionResponse {
  status: boolean;
  message: string;
  data: CompletedRedemptionData;
}
export interface CheckAlldataFilledOrNotResponse {
  status: boolean;
  message: string;
  data: {
    is_complete: boolean;
  };
}

export interface Subscription {
  id: number;
  plan_name: string;
  duration: string;
  price: string;
  features: string;
  active_subscribers: number;
  created_at: string;
  updated_at: string;
  discount: string;
  discount_price: string;
}

export interface SubscriptionsResponse {
  status: boolean;
  message: string;
  data: Subscription[];
}

export interface CalendarApiResponse {
  status: boolean;
  message: string;
  data: CalendarData;
}

export interface CalendarData {
  total_workout: number;
  result: HabitResult[];
}

export interface HabitResult {
  habit_name: string;
  total_complete_count: number;
  calendar: CalendarEntry[];
}

export interface CalendarEntry {
  day: number;
  date: string; // ISO date string (e.g. "2025-09-01")
  completed: boolean;
}

export interface SayNoDataItem {
  month: string;
  total_say_no: number;
}

export interface SayNoData {
  year: number;
  data: SayNoDataItem[];
}

export interface SayNoApiResponse {
  status: boolean;
  message: string;
  data: SayNoData;
}

export interface HabitTrackingData {
  start: string;
  end: string;
  data: HabitDatas[];
}

export interface HabitTrackingResponse {
  status: boolean;
  message: string;
  data: HabitTrackingData;
}
// export interface SubscriptionResponse {
//   status: boolean;
//   message: string;
//   data: {
//     is_premium_check: boolean;
//   };
// }

/**
 * Represents the details of the user's current subscription plan.
 */
interface CurrentPlan {
  id: number;
  user_id: number;
  plan_name: string; // e.g., "Premium"
  duration: string; // e.g., "Monthly"
  price: string; // Stored as string to handle currency precision, e.g., "5.99"
  features: string[]; // Array of included features
  renewal: string; // Date/time string for renewal, e.g., "2025-11-22 04:25:29"
  created_at: string; // ISO 8601 date string
  updated_at: string; // ISO 8601 date string
}

//---

/**
 * Represents the 'data' payload containing the premium status and plan details.
 */
interface SubscriptionData {
  is_premium_check: boolean;
  current_plan: CurrentPlan;
  is_premium_user: boolean;
}

//---

/**
 * The root interface for the entire API response object.
 */
export interface SubscriptionResponse {
  status: boolean; // Indicates general success/failure (though data suggests user is premium)
  message: string; // Descriptive message, e.g., "Premium user check"
  data: SubscriptionData;
}

export interface HabitDatas {
  month: string;
  completed_count: number;
  max_completed_count: number | string;
}

export interface ChallengeResponse {
  status: boolean;
  message: string;
  data: string[];
}

export type Group = {
  id: number;
  user_id: number;
  group_name: string;
  challenge_type: string;
  duration: string;
  start_date: string; // ISO date string
  end_date: string; // ISO date string
  status: string;
  created_at: string;
  updated_at: string;
  members_count: number;
  max_count: number;
  group_daily_progress: number;
  my_daily_progress: number;
  member_lists: [
    {
      id: number;
      challenge_group_id: number;
      user_id: 3;
      status: "Active";
      joined_at: string;
      created_at: string;
      updated_at: string;
      user: {
        id: 3;
        full_name: string;
        avatar_url: string;
      };
    }
  ];
};

export type GroupResponse = {
  status: boolean;
  message: string;
  data: Pagination<Group>;
};
export type CelebrationPayloade = {
  id: number | string;
  con_user_id: number | string | undefined;
};

export interface RedemptionsApiResponse {
  status: boolean;
  message: string;
  data: {
    redemption_completed: number;
    redemption_pending: number;
    redeem_histories: RedeemHistories;
  };
}

export interface RedeemHistories {
  current_page: number;
  data: RedeemHistory[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface Link {
  url: string | null;
  label: string;
  active: boolean;
}

export interface RedemptionDetailsApiResponse {
  status: boolean;
  message: string;
  data: RedemptionDetails;
}
export interface RewardHistoryDetailsApiResponse {
  status: boolean;
  message: string;
}

export interface RedemptionDetails {
  id: number;
  user_id: number;
  reward_id: number;
  partner_id: number;
  date: string; // 2025-09-20 16:56:19"
  code: string;
  status: "Completed" | "Pending"; // status এর সম্ভাব্য value
  created_at: string; // ISO string
  updated_at: string; // ISO string
  user: User;
  reward: Reward;
}

export interface User {
  id: number;
  full_name: string;
  role: string; // "USER", "STORE_MANAGER", etc.
  avatar_url: string;
}

export interface RewardsHistoryResponse {
  status: boolean;
  message: string;
  data: RewardsData;
}

export interface RewardsData {
  current_page: number;
  data: RewardPartner[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface RewardPartner {
  id: number;
  partner_id: number;
  title: string;
  challenge_type: string;
  description: string;
  expiration_date: string; // ISO string
  purchase_point: number;
  status: "Enable" | "Disable"; //  possible values fixed
  admin_approved: "Pending" | "Approved" | "Rejected"; // possible values
  created_at: string; // ISO string
  updated_at: string; // ISO string
  image_url?: string;
  image?: string;
}

// export interface Link {
//   url: string | null;
//   label: string;
//   active: boolean;
// }

export interface CreateRewardPayload {
  title: string;
  challenge_type: string;
  description: string;
  expiration_date: string; // formatDate() string return করে
  purchase_point: number;
}

export interface DailyGroupSummaryResponse {
  status: boolean;
  message: string;
  data: {
    my_achieved_point: number;
    summaries: {
      date: string; // YYYY-MM-DD
      day: number;
      group_completion: number;
      members: {
        user_id: number;
        user_name: string;
        progress: number;
        status: string[];
        is_all_completed: boolean;
      };
    };
  };
}

export interface CompletedApiResponse {
  status: boolean;
  message: string;
  data: {
    current_page: number;
    data: CompletedData[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: {
      url: string | null;
      label: string;
      active: boolean;
    };
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
  };
}

export interface CompletedData {
  id: number;
  user_id: number;
  group_name: string;
  challenge_type: string;
  duration: string;
  start_date: string; // ISO datetime string
  end_date: string; // ISO datetime string
  status: string;
  created_at: string;
  updated_at: string;
  members_count: number;
  max_count: number;
  my_progress: number;
  group_progress: number;
}

// notificationsResponse.ts
export interface NotificationData {
  title: string;
  body: string;
  invited?: true;
  data: {
    id: number;
  };
}

export interface Notification {
  id: string;
  type: string;
  notifiable_type: string;
  notifiable_id: number;
  data: NotificationData;
  read_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface PaginationLinks {
  url: string | null;
  label: string;
  active: boolean;
}

export interface NotificationsResponse {
  status: boolean;
  message: string;
  data: {
    current_page: number;
    data: Notification[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: PaginationLinks[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
  };
}

// Single user type
export interface Friend {
  id: number;
  full_name: string;
  role: "USER" | "PARTNER";
  avatar_url: string;
}

export interface FriendResponseData {
  current_page: number;
  data: Friend[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

// Full API response type
export interface FriendResponse {
  status: boolean;
  message: string;
  data: FriendResponseData;
}

export type FriendPayloade = {
  search?: string;
  page: number | string;
  per_page: number | string;
};
export type InvitePayloade = {
  user_id: number | string | undefined;
  challenge_group_id: number | string | undefined;
};

// Single group/challenge type
export interface MyChallenge {
  id: number;
  user_id: number;
  group_name: string;
  challenge_type: string;
  duration: string;
  start_date: string;
  end_date: string;
  status: string;
  created_at: string;
  updated_at: string;
}

// Pagination & data type
export interface MyAllChallengeData {
  current_page: number;
  data: MyChallenge[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

// Full API response type
export interface MyAllChallengeResponse {
  status: boolean;
  message: string;
  data: MyAllChallengeData;
}

export interface AvailableRewardsRadiosResponse {
  status: boolean;
  message: string;
  data: {
    message: string;
    center: {
      latitude: string;
      longitude: string;
    };
    data: RewardsPagination;
  };
}

export interface RewardsPagination {
  current_page: number;
  data: RewardItem[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface RewardItem {
  id: number;
  partner_id: number;
  title: string;
  challenge_type: string;
  description: string;
  expiration_date: string;
  purchase_point: number;
  location: string;
  latitude: string;
  longitude: string;
  status: string;
  admin_approved: string;
  created_at: string;
  updated_at: string;
  distance: number;
  distance_calculated: number;
  image?: string;
  image_url?: string;
}

export interface RewardDetailsResponse {
  status: boolean;
  message: string;
  data: RewardData;
}

export interface RewardData {
  id: number;
  partner_id: number;
  title: string;
  description: string;
  purchase_point: number;
  challenge_type: string | null;
  image: string;
  image_url: string;
  location: string;
  latitude: string;
  longitude: string;
  expiration_date: string;
  admin_approved: "Pending" | "Approved" | "Rejected";
  status: "Enable" | "Disable";
  created_at: string;
  updated_at: string;
}

// Single Group item
export interface GroupView {
  id: number;
  user_id: number;
  group_name: string;
  challenge_type: string;
  duration: string; // backend string দিচ্ছে
  start_date: string; // ISO date string
  end_date: string; // ISO date string
  status: "Completed" | "Active" | "Pending"; // future-proof
  created_at: string;
  updated_at: string;
  members_count: number;
  max_count: number;
  group_daily_progress: number;
  my_daily_progress: number;
}

// Full API response
export interface GroupApiResponse {
  status: boolean;
  message: string;
  data: GroupView[];
}
