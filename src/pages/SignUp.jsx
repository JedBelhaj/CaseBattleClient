import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonPr, FormInput } from "@/components/ui";
import { RainDropEffect } from "@/components/effects";
import { useSkins } from "@/hooks/useSkins";
import { useUsername } from "@/hooks/useUsername";
import { useSignUpForm } from "@/hooks/useSignUpForm";
import { SIGNUP_CONSTANTS, SIGNUP_MESSAGES } from "@/constants/signup";

function SignUp() {
  const navigate = useNavigate();
  const skins = useSkins();
  const { updateUsername } = useUsername();
  const { formData, errors, isLoading, setIsLoading, updateField, validateForm, resetForm } = useSignUpForm();

  const skinCount = 200;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Save username and navigate
      updateUsername(formData.username);
      navigate("/");
    } catch (error) {
      console.error("Signup failed:", error);
      // Handle error (show toast, etc.)
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackHome = () => {
    navigate("/");
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col text-yellow-500 select-none bg-gradient-to-t from-slate-900 to-zinc-900">
      <div className="flex flex-col items-center justify-center bg-black/40 px-14 py-12 rounded-3xl backdrop-blur-sm z-50 transition-all duration-500">
        <h1 className="bg-gradient-to-r from-yellow-500 to-amber-500 bg-clip-text text-transparent text-5xl sm:text-7xl font-oxanium text-center">
          {SIGNUP_MESSAGES.TITLE}
        </h1>
        <div className="flex flex-col items-center justify-center m-4">
          <form onSubmit={handleSubmit} className="w-full">
            <FormInput
              label={SIGNUP_MESSAGES.USERNAME_LABEL}
              type="text"
              placeholder={SIGNUP_CONSTANTS.DEFAULT_USERNAME_PLACEHOLDER}
              value={formData.username}
              onChange={(e) => updateField("username", e.target.value)}
              error={errors.username}
              maxLength={SIGNUP_CONSTANTS.USERNAME_MAX_LENGTH}
              minLength={SIGNUP_CONSTANTS.USERNAME_MIN_LENGTH}
            />
            
            <FormInput
              label={SIGNUP_MESSAGES.PASSWORD_LABEL}
              type="password"
              placeholder={SIGNUP_CONSTANTS.DEFAULT_PASSWORD_PLACEHOLDER}
              value={formData.password}
              onChange={(e) => updateField("password", e.target.value)}
              error={errors.password}
              maxLength={SIGNUP_CONSTANTS.PASSWORD_MAX_LENGTH}
              minLength={SIGNUP_CONSTANTS.PASSWORD_MIN_LENGTH}
            />
            
            <FormInput
              label={SIGNUP_MESSAGES.CONFIRM_PASSWORD_LABEL}
              type="password"
              placeholder={SIGNUP_CONSTANTS.DEFAULT_PASSWORD_PLACEHOLDER}
              value={formData.confirmPassword}
              onChange={(e) => updateField("confirmPassword", e.target.value)}
              error={errors.confirmPassword}
              maxLength={SIGNUP_CONSTANTS.PASSWORD_MAX_LENGTH}
              minLength={SIGNUP_CONSTANTS.PASSWORD_MIN_LENGTH}
            />
            
            <div className="mt-4 flex items-center justify-center">
              <ButtonPr 
                value={isLoading ? "Creating..." : SIGNUP_MESSAGES.CREATE_ACCOUNT} 
                action={handleSubmit}
                disabled={isLoading}
                type="submit"
              />
            </div>
          </form>
          <button
            onClick={handleBackHome}
            className="underline text-sm cursor-pointer hover:text-yellow-400 transition-colors mt-2"
            type="button"
          >
            {SIGNUP_MESSAGES.BACK_HOME}
          </button>
        </div>
      </div>
      <RainDropEffect skins={skins} skinCount={skinCount} />
    </div>
  );
}

export default SignUp;
