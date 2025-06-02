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
  otpCode: string;
};

const OTPVerify = ({
  onVerifyCode,
  setPageState,
  onSendOTP,
  otpCode,
  handleOTPOnChange,
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

  return (
    <OTPFormLayout backButton={handleBackButton} onSubmit={handleVerifyCode}>
      <Text
        type="h6"
        text="Please check your email"
        priority="heading"
        className={style.OTPVerify_form_code_header}
      />
      <Text
        type="p"
        text="We've sent a code to anton@gmail.com"
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
