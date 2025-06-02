import { useState } from "react";

import submitPersonalDetails from "@services/submitPersonalDetails";

import setViewToTop from "@helpers/setViewToTop";

import initialPersonalData from "@constance/initialPersonalData";

import { personalDetails, otpSendCode, otpVerify } from "@constance/pageStates";
import { textRegex, emailRegex, phoneNumberRegex } from "@constance/regex";

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

  const inputValidation = (field: string, value: string, regex: RegExp) => {
    const updateDataSet = personalDataForm[field];
    if (!regex.test(value)) {
      updateDataSet.isValid = "not_valid";
      setPersonalDataFrom({ ...personalDataForm, ...updateDataSet });

      console.log("not valid");
      return;
    }
    updateDataSet.isValid = "";
    setPersonalDataFrom({ ...personalDataForm, ...updateDataSet });
  };

  const onSubmitPersonDetailsForm = async () => {
    Object.keys(personalDataForm).forEach((key) => {
      let regex: RegExp;

      switch (key) {
        case "firstName":
        case "lastName":
        case "gender":
        case "residency":
          regex = textRegex;
          break;

        case "email":
          regex = emailRegex;
          break;

        case "phoneNumber":
          regex = phoneNumberRegex;
      }

      const formFieldData = personalDataForm[key];
      inputValidation(key, formFieldData.value, regex);
    });

    try {
      console.log({ personalDataForm });
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
    personalDataForm,
    updateForm,
    inputValidation,
  };
};

export default useRegistrationPage;
