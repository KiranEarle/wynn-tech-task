import { useState } from "react";

import submitPersonalDetails from "@services/submitPersonalDetails";

import setViewToTop from "@helpers/setViewToTop";

import initialPersonalData from "@constance/initialPersonalData";

import { personalDetails, otpSendCode, otpVerify } from "@constance/pageStates";

import WynnRegistrationsApp from "@app-types/WynnRegistrationsApp.types";

const useRegistrationPage = () => {
  const [pageState, setPageState] =
    useState<WynnRegistrationsApp.PageStates>(personalDetails);

  const [personalDataForm, setPersonalDataFrom] = useState(initialPersonalData);

  const updateForm = (field: string, value: string) => {
    const updateDataSet = personalDataForm[field];
    updateDataSet.value = value;

    setPersonalDataFrom({ ...personalDataForm, ...updateDataSet });
  };

  const validateTextInput = (field: string, value: string) => {
    console.log({ field, value });
    const textRegex = /^[A-Za-z\s]+$/;
    const updateDataSet = personalDataForm[field];
    if (!textRegex.test(value)) {
      updateDataSet.isValid = "not_valid";
      setPersonalDataFrom({ ...personalDataForm, ...updateDataSet });

      console.log("not valid");
      return;
    }
    updateDataSet.isValid = "";
    setPersonalDataFrom({ ...personalDataForm, ...updateDataSet });
  };

  const validateSelectInput = (field: string, value: string) => {};

  const validatePhoneNumberInput = (field: string, value: string) => {};

  const validateEmailInput = (field: string, value: string) => {
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const updateDataSet = personalDataForm[field];

    if (!emailRegex.test(value)) {
      updateDataSet.isValid = "not_valid";
      setPersonalDataFrom({ ...personalDataForm, ...updateDataSet });

      console.log("not valid");
      return;
    }
    updateDataSet.isValid = "";
    setPersonalDataFrom({ ...personalDataForm, ...updateDataSet });
  };

  const onSubmitPersonDetailsForm = async () => {
    try {
      console.log({ personalDataForm });
      // await submitPersonalDetails({
      //   firstName: "",
      //   lastName: "",
      //   gender: "",
      //   email: "",
      //   phoneNumber: "",
      //   residency: "",
      // });
      // setPageState(otpSendCode);
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
    personalDataForm,
    updateForm,
    validateEmailInput,
    validateTextInput,
    validateSelectInput,
    validatePhoneNumberInput,
  };
};

export default useRegistrationPage;
