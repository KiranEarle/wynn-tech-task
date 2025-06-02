import { useState } from "react";

import submitPersonalDetails from "@services/submitPersonalDetails";
import { personalDetails, otpSendCode, otpVerify } from "@constance/pageStates";

import WynnRegistrationsApp from "@app-types/WynnRegistrationsApp.types";

const useRegistrationPage = () => {
  const [pageState, setPageState] =
    useState<WynnRegistrationsApp.PageStates>(personalDetails);

  const setViewToTop = () => window.scrollTo({ top: 0 });

  const onSubmitPersonDetailsForm = async () => {
    try {
      await submitPersonalDetails({
        firstName: "",
        lastName: "",
        gender: "",
        email: "",
        phoneNumber: "",
        residency: "",
      });
      setPageState(otpSendCode);
      setViewToTop();
    } catch (e) {
      console.error(e);
    }
  };

  const onSendOTP = async () => {
    setPageState(otpVerify);
    setViewToTop();
  };

  const onVerifyCode = async () => {
    console.log("submit verification code");
  };

  return {
    pageState,
    setPageState,
    onSubmitPersonDetailsForm,
    onSendOTP,
    onVerifyCode,
  };
};

export default useRegistrationPage;
