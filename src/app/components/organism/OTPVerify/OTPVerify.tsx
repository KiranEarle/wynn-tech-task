import { useState, useRef } from "react";

import Text from "@components/atoms/Text";
import OTPFormLayout from "@components/molecules/OTPFormLayout";

import { otpSendCode } from "@constance/pageStates";

import WynnRegistrationsApp from "@app-types/WynnRegistrationsApp.types";

import style from "./otp-verify.module.css";

export type OTPVerifyProps = {
  onVerifyCode: (code: string) => Promise<void>;
  setPageState: (page: WynnRegistrationsApp.PageStates) => void;
};

const OTPVerify = ({ onVerifyCode, setPageState }: OTPVerifyProps) => {
  const [code, setCode] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e) => {
    const newValue = e.target.value.replace(/\D/g, "").slice(0, 4); // only digits, max 4
    setCode(newValue);
  };

  const handleClick = () => {
    inputRef?.current?.focus();
  };

  const handleBackButton = () => {
    setPageState(otpSendCode);
  };

  const handleVerifyCode = async () => {
    onVerifyCode(code);
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
          value={code}
          onChange={handleChange}
          maxLength={4}
          ref={inputRef}
          className={style.OTPVerify_input_internal}
        />
        <div className={style.OTPVerify_input_fields}>
          {[0, 1, 2, 3].map((i) => {
            return (
              <div key={i} className={style.OTPVerify_input_field_box}>
                {code[i] || ""}
              </div>
            );
          })}
        </div>
      </div>
      <span className={style.OTPVerify_resend_code}>
        Didn&apos;t get a code?{" "}
        <span onClick={() => console.log("Resend")}>Click to resend.</span>
      </span>
    </OTPFormLayout>
  );
};

export default OTPVerify;
