export const SIGNUP_CONSTANTS = {
  USERNAME_MIN_LENGTH: 3,
  USERNAME_MAX_LENGTH: 14,
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 20,
  DEFAULT_USERNAME_PLACEHOLDER: "ShadawStyleSmpl",
  DEFAULT_PASSWORD_PLACEHOLDER: "*******",
};

export const SIGNUP_MESSAGES = {
  TITLE: "Sign Up!",
  USERNAME_LABEL: "Username:",
  PASSWORD_LABEL: "Password:",
  CONFIRM_PASSWORD_LABEL: "Confirm Password:",
  CREATE_ACCOUNT: "Create Account",
  BACK_HOME: "Back Home",
  PASSWORD_MISMATCH: "Passwords do not match",
  USERNAME_TOO_SHORT: "Username is too short",
  PASSWORD_TOO_SHORT: "Password is too short",
  INVALID_INPUT: "Please fill in all fields correctly",
};

export const VALIDATION_RULES = {
  USERNAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 14,
    PATTERN: /^[a-zA-Z0-9_]+$/,
  },
  PASSWORD: {
    MIN_LENGTH: 8,
    MAX_LENGTH: 20,
  },
};
