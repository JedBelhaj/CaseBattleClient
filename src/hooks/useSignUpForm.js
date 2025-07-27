import { useState } from "react";
import { VALIDATION_RULES, SIGNUP_MESSAGES } from "@/constants/signup";

export const useSignUpForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate username
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < VALIDATION_RULES.USERNAME.MIN_LENGTH) {
      newErrors.username = SIGNUP_MESSAGES.USERNAME_TOO_SHORT;
    } else if (formData.username.length > VALIDATION_RULES.USERNAME.MAX_LENGTH) {
      newErrors.username = "Username is too long";
    } else if (!VALIDATION_RULES.USERNAME.PATTERN.test(formData.username)) {
      newErrors.username = "Username can only contain letters, numbers, and underscores";
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < VALIDATION_RULES.PASSWORD.MIN_LENGTH) {
      newErrors.password = SIGNUP_MESSAGES.PASSWORD_TOO_SHORT;
    } else if (formData.password.length > VALIDATION_RULES.PASSWORD.MAX_LENGTH) {
      newErrors.password = "Password is too long";
    }

    // Validate confirm password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = SIGNUP_MESSAGES.PASSWORD_MISMATCH;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setFormData({ username: "", password: "", confirmPassword: "" });
    setErrors({});
    setIsLoading(false);
  };

  return {
    formData,
    errors,
    isLoading,
    setIsLoading,
    updateField,
    validateForm,
    resetForm,
  };
};
