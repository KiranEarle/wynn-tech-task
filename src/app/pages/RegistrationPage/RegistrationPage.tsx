"use client";

import Text from "@components/atoms/Text";
import RegistrationForm from "@components/organism/RegistrationForm";
import OTPSend from "@components/organism/OTPSend/OTPSend";

import useRegistrationPage from "@hooks/useRegistrationPage";

import WynnRegistrationsApp from "@app-types/WynnRegistrationsApp.types";

import "./registration-page.css";

const RegistrationPage = () => {
  const { pageState, setPageState, onSubmitPersonDetailsForm, onSendOTP } =
    useRegistrationPage();

  const inputOnChange = () => {
    console.log("inputChange");
  };

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
          formData={{} as WynnRegistrationsApp.PersonalDetailsFormData}
          inputOnChange={inputOnChange}
          onSubmit={onSubmitPersonDetailsForm}
        />
      )}
      {pageState.state === "otpSendCode" && (
        <OTPSend
          setPageState={(page) => setPageState(page)}
          onSendOTP={onSendOTP}
        />
      )}

      {pageState.state === "otpVerify" && <div>OTP Verify</div>}
    </div>
  );
};

export default RegistrationPage;
