"use client";

import Text from "@components/atoms/Text";
import RegistrationForm from "@components/organism/RegistrationForm";
import OTPSend from "@components/organism/OTPSend";
import OTPVerify from "@components/organism/OTPVerify";

import useRegistrationPage from "@hooks/useRegistrationPage";

import WynnRegistrationsApp from "@app-types/WynnRegistrationsApp.types";

import "./registration-page.css";

const RegistrationPage = () => {
  const {
    pageState,
    setPageState,
    onSubmitPersonDetailsForm,
    onSendOTP,
    onVerifyCode,
    personalDataForm,
    updateForm,
    inputValidation,
    updateFormPhoneNumber,
    isTermChecked,
    handleCheckTerms,
  } = useRegistrationPage();

  return (
    <div className="Registration-page">
      <div className="Registration-page-top-content">
        <div className="Registration-page-content">
          <Text
            type="h1"
            text="Registration"
            priority="heading"
            className="Registration-page-title"
          />
          <Text
            type="p"
            text="Please enter below information to create your account."
            priority="normal"
          />
        </div>
        <Text
          type="h2"
          text={`Step ${pageState.stepNumber} of 3`}
          priority="heading"
        />
      </div>
      {pageState.state === "personalDetails" && (
        <RegistrationForm
          formData={
            personalDataForm as WynnRegistrationsApp.PersonalDetailsFormData
          }
          inputOnChange={updateForm}
          onSubmit={onSubmitPersonDetailsForm}
          inputValidation={inputValidation}
          inputOnChangePhoneNumber={updateFormPhoneNumber}
          onCheckTerms={handleCheckTerms}
          isTermChecked={isTermChecked}
        />
      )}
      {pageState.state === "otpSendCode" && (
        <OTPSend setPageState={setPageState} onSendOTP={onSendOTP} />
      )}

      {pageState.state === "otpVerify" && (
        <OTPVerify setPageState={setPageState} onVerifyCode={onVerifyCode} />
      )}
    </div>
  );
};

export default RegistrationPage;
