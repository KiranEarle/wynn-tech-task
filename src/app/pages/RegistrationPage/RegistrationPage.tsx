"use client";

import Text from "@components/atoms/Text";
import RegistrationForm from "@components/organism/RegistrationForm";
import OTPSend from "@components/organism/OTPSend";
import OTPVerify from "@components/organism/OTPVerify";

import useRegistrationPage from "@hooks/useRegistrationPage";

import WynnRegistrationsApp from "@app-types/WynnRegistrationsApp.types";

import style from "./registration-page.module.css";

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
    sendOTPOption,
    setSendOTPOption,
    handleOTPOnChange,
    otpCode,
    isSubmitForm,
  } = useRegistrationPage();

  return (
    <div className={style.Registration_page}>
      <div className={style.Registration_page_top_content}>
        <div>
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
          isSubmitForm={isSubmitForm}
        />
      )}
      {pageState.state === "otpSendCode" && (
        <OTPSend
          sendOTPOption={sendOTPOption}
          setSendOTPOption={setSendOTPOption}
          setPageState={setPageState}
          onSendOTP={onSendOTP}
          isSubmitForm={isSubmitForm}
        />
      )}

      {pageState.state === "otpVerify" && (
        <OTPVerify
          onSendOTP={onSendOTP}
          setPageState={setPageState}
          onVerifyCode={onVerifyCode}
          handleOTPOnChange={handleOTPOnChange}
          phoneNumber={personalDataForm.phoneNumber.fullNumber}
          emailAddress={personalDataForm.email.value}
          sendOTPOption={sendOTPOption}
          otpCode={otpCode}
          isSubmitForm={isSubmitForm}
        />
      )}
    </div>
  );
};

export default RegistrationPage;
