import { SetStateAction, Dispatch } from "react";

import Text from "@components/atoms/Text";
import Radio from "@components/atoms/Radio";
import OTPFormLayout from "@components/molecules/OTPFormLayout";

import { personalDetails } from "@constance/pageStates";

import WynnRegistrationsApp from "@app-types/WynnRegistrationsApp.types";

import style from "./otp-send.module.css";

export type OTPSendProps = {
  onSendOTP: () => Promise<void>;
  setPageState: (page: WynnRegistrationsApp.PageStates) => void;
  setSendOTPOption: Dispatch<
    SetStateAction<WynnRegistrationsApp.OTSRequestTypes>
  >;
  sendOTPOption: WynnRegistrationsApp.OTSRequestTypes;
};

const OTPSend = ({
  onSendOTP,
  setPageState,
  sendOTPOption,
  setSendOTPOption,
}: OTPSendProps) => {
  const handleBackButton = () => {
    setPageState(personalDetails);
  };
  const handleSendOption = async () => {
    await onSendOTP();
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
          checked={sendOTPOption === "phone"}
          onChange={(e) => {
            if (e.target.checked) {
              setSendOTPOption(
                e.target.value as WynnRegistrationsApp.OTSRequestTypes
              );
            }
          }}
        />
        <Radio
          label="Send to Email"
          name="otp"
          value="email"
          checked={sendOTPOption === "email"}
          onChange={(e) => {
            if (e.target.checked) {
              setSendOTPOption(
                e.target.value as WynnRegistrationsApp.OTSRequestTypes
              );
            }
          }}
        />
      </div>
    </OTPFormLayout>
  );
};

export default OTPSend;
