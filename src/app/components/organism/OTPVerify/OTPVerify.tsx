import { useRef } from "react";

import Text from "@components/atoms/Text";
import OTPFormLayout from "@components/molecules/OTPFormLayout";

import { otpSendCode } from "@constance/pageStates";

import WynnRegistrationsApp from "@app-types/WynnRegistrationsApp.types";

import style from "./otp-verify.module.css";

export type OTPVerifyProps = {
  onVerifyCode: () => Promise<void>;
  setPageState: (page: WynnRegistrationsApp.PageStates) => void;
  onSendOTP: () => Promise<void>;
  handleOTPOnChange: (e) => void;
  sendOTPOption: WynnRegistrationsApp.OTSRequestTypes;
  phoneNumber: string;
  emailAddress: string;
  otpCode: string;
  isSubmitForm: boolean;
};

const OTPVerify = ({
  onVerifyCode,
  setPageState,
  onSendOTP,
  otpCode,
  handleOTPOnChange,
  isSubmitForm,
  sendOTPOption,
  phoneNumber,
  emailAddress,
}: OTPVerifyProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef?.current?.focus();
  };

  const handleBackButton = () => {
    setPageState(otpSendCode);
  };

  const handleVerifyCode = async () => {
    await onVerifyCode();
  };

  const handleSendOption = async () => {
    await onSendOTP();
  };

  const sentOptionText =
    sendOTPOption === "email"
      ? `We've sent a code to ${emailAddress}`
      : `We've sent a code to your phone number ending in ${phoneNumber.slice(
          -3
        )}`;

  return (
    <OTPFormLayout
      isSubmitForm={isSubmitForm}
      backButton={handleBackButton}
      onSubmit={handleVerifyCode}
      loadingText="Verifying"
    >
      <Text
        type="h6"
        text="Please check your email"
        priority="heading"
        className={style.OTPVerify_form_code_header}
      />
      <Text
        type="p"
        text={sentOptionText}
        priority="normal"
        className={style.OTPVerify_form_code_p}
      />
      <div onClick={handleClick} className={style.OTPVerify_input_wrapper}>
        <input
          id="otp-code"
          type="text"
          inputMode="numeric"
          value={otpCode}
          onChange={handleOTPOnChange}
          maxLength={4}
          ref={inputRef}
          className={style.OTPVerify_input_internal}
        />
        <div className={style.OTPVerify_input_fields}>
          {[0, 1, 2, 3].map((i) => {
            return (
              <div key={i} className={style.OTPVerify_input_field_box}>
                {otpCode[i] || ""}
              </div>
            );
          })}
        </div>
      </div>
      <span className={style.OTPVerify_resend_code}>
        Didn&apos;t get a code?{" "}
        <span onClick={handleSendOption}>Click to resend.</span>
      </span>
    </OTPFormLayout>
  );
};

export default OTPVerify;
