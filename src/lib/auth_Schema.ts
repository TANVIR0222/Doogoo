import * as Yup from "yup";

// Validation Schema
export const LoginSchema = Yup.object().shape({
  email: Yup.string().required("Email or phone is required"),

  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

export const RegisterSchema = Yup.object().shape({
  full_name: Yup.string().required("Name is required"),
  email: Yup.string().required("Email or phone is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  password_confirmation: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password")], "Passwords must match"),
  phone_number: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9]+$/, "Phone number must contain only digits")
    .min(7, "Phone number must be at least 7 digits")
    .max(15, "Phone number must be at most 15 digits"),
  // country_code: Yup.string()
  //   .required("Country code is required")
  //   .matches(
  //     /^\+\d+$/,
  //     "Country code must start with '+' and contain only digits"
  //   ),
});

export const VerifyEmailSchema = Yup.object().shape({
  email: Yup.string().required("Email or phone is required"),
});
export const ConfirmationdSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 8 characters"),
  password_confirmation: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

export const changePasswordValidationSchema = Yup.object().shape({
  current_password: Yup.string()
    .required("Current password is required")
    .min(8, "Current password must be at least 8 characters"),

  password: Yup.string()
    .required("New password is required")
    .min(8, "New password must be at least 8 characters"),

  password_confirmation: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password")], "Passwords do not match"),
});

export const RewardSchema = Yup.object().shape({
  title: Yup.string().trim().required("Title is required"),
  description: Yup.string().trim().required("Description is required"),
  purchasePoint: Yup.number()
    .typeError("Points must be a number")
    .required("Points are required")
    .min(1, "Minimum 1 point"),
  expirationDate: Yup.date()
    .required("Expiration date is required")
    .test("is-future-date", "Must be a future date", (value) => {
      if (!value) return false;
      const today = new Date();
      today.setHours(0, 0, 0, 0); // reset time
      return value > today; // must be strictly after today
    }),
});
