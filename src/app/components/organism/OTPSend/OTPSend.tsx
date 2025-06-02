import { useState } from "react";

import Text from "@components/atoms/Text";
import Radio from "@components/atoms/Radio";
import OTPFormLayout from "@components/molecules/OTPFormLayout";

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
  const handleSendOption = async () => {
    onSendOTP(sendOption);
  };

  return (
    <OTPFormLayout backButton={handleBackButton} onSubmit={handleSendOption}>
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
    </OTPFormLayout>
  );
};

export default OTPSend;
