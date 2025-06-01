import { useState } from "react";

import Text from "@components/atoms/Text";
import Button from "@components/atoms/Button";
import Radio from "@components/atoms/Radio";
import { personalDetails } from "@constance/pageStates";

import WynnRegistrationsApp from "@app-types/WynnRegistrationsApp.types";

import style from "./otp-send.module.css";

type OTPOptions = "phone" | "email";

export type OTPSendProps = {
  onSendOTP: (type: OTPOptions) => Promise<void>;
  setPageState: (page: WynnRegistrationsApp.PageStates) => void;
};

const OTPSend = ({ onSendOTP, setPageState }: OTPSendProps) => {
  const [sendOption, setSendOption] = useState<OTPOptions>("phone");
  const handleBackButton = () => {
    setPageState(personalDetails);
  };
  const handleSendOption = () => {
    onSendOTP(sendOption);
  };

  return (
    <form className={style.OTPSend_form}>
      <Text
        type="h2"
        text="OTP Verification"
        priority="heading"
        decoration="underline"
        className={style.OTPSend_form_header}
      />
      <div className={style.OTPSend_section}>
        <Text
          type="h6"
          text="Send Code"
          priority="heading"
          className={style.OTPSend_form_code_header}
        />
        <Text
          type="p"
          text="How would you like to receive the code?"
          priority="normal"
          className={style.OTPSend_form_code_p}
        />
        <div className={style.OTPSend_radio}>
          <Radio
            label="Send to Phone"
            name="otp"
            value="phone"
            onChange={(e) => {
              if (e.target.checked) {
                setSendOption(e.target.value as OTPOptions);
              }
            }}
          />
          <Radio
            label="Send to Email"
            name="otp"
            value="email"
            onChange={(e) => {
              if (e.target.checked) {
                setSendOption(e.target.value as OTPOptions);
              }
            }}
          />
        </div>
      </div>
      <div className={style.OTPSend_cta}>
        <Button label="Back" priority="secondary" onClick={handleBackButton} />
        <Button label="Next" onClick={handleSendOption} />
      </div>
    </form>
  );
};

export default OTPSend;
