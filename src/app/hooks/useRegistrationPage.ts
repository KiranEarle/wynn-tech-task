import { useState } from "react";

import { personalDetails, otpSendCode, otpVerify } from "@constance/pageStates";

import WynnRegistrationsApp from "@app-types/WynnRegistrationsApp.types";

const useRegistrationPage = () => {
  const [pageState, setPageState] =
    useState<WynnRegistrationsApp.PageStates>(personalDetails);

  const setViewToTop = () => window.scrollTo({ top: 0 });

  const onSubmitPersonDetailsForm = async () => {
    setPageState(otpSendCode);
    setViewToTop();
  };

  const onSendOTP = async () => {
    setPageState(otpVerify);
    setViewToTop();
  };

  return { pageState, setPageState, onSubmitPersonDetailsForm, onSendOTP };
};

export default useRegistrationPage;
