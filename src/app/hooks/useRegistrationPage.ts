import { useState } from "react";

import { personalDetails, otpSendCode, otpVerify } from "@constance/pageStates";

import WynnRegistrationsApp from "@app-types/WynnRegistrationsApp.types";

const useRegistrationPage = () => {
  const [pageState, setPageState] =
    useState<WynnRegistrationsApp.PageStates>(personalDetails);

  const onSubmitPersonDetailsForm = async () => {
    setPageState(otpSendCode);
  };

  const onSendOTP = async () => {
    setPageState(otpVerify);
  };

  return { pageState, setPageState, onSubmitPersonDetailsForm, onSendOTP };
};

export default useRegistrationPage;
