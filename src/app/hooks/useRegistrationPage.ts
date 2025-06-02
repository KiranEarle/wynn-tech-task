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

    setPersonalDataFrom({ ...personalDataForm, [field]: updateDataSet });
  };

  const updateFormPhoneNumber = (code: string, number: string) => {
    const phoneNumber = `${code}${number}`;
    const updateDataSet = personalDataForm;

    updateDataSet.phoneNumber = {
      ...updateDataSet.phoneNumber,
      value: number,
      code,
      fullNumber: phoneNumber,
    };

    setPersonalDataFrom({
      ...personalDataForm,
      phoneNumber: updateDataSet.phoneNumber,
    });
  };

  const inputValidation = (field: string, value: string, regex: RegExp) => {
    const updateDataSet = personalDataForm[field];

    if (!regex.test(value)) {
      updateDataSet.isValid = "not_valid";
      setPersonalDataFrom({ ...personalDataForm, [field]: updateDataSet });
      return;
    }

    updateDataSet.isValid = "";
    setPersonalDataFrom({ ...personalDataForm, [field]: updateDataSet });
  };

  const onSubmitPersonDetailsForm = async () => {
    const formKeys = Object.keys(personalDataForm);
    formKeys.forEach((key) => {
      let regex: RegExp = textRegex;
      console.log({ key });

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
      let value = formFieldData.value;

      if (key === "phoneNumber") {
        value = formFieldData.fullNumber;
      }
      inputValidation(key, value, regex);
    });

    if (
      formKeys
        .map((data) => personalDataForm[data])
        .some((data) => data.isValid === "not_valid")
    ) {
      return;
    }

    try {
      await submitPersonalDetails({
        firstName: personalDataForm.firstName.value,
        lastName: personalDataForm.lastName.value,
        gender: personalDataForm.gender.value,
        email: personalDataForm.email.value,
        phoneNumber: personalDataForm.phoneNumber.fullNumber,
        residency: personalDataForm.residency.value,
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
    updateFormPhoneNumber,
    inputValidation,
  };
};

export default useRegistrationPage;
