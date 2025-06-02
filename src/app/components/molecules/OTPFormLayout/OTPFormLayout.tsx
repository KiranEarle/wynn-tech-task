import Text from "@components/atoms/Text";
import Button from "@components/atoms/Button";

import style from "./otp-form-layout.module.css";

export type OTPFormLayoutProps = {
  onSubmit: (e: unknown) => Promise<void>;
  backButton: () => void;
  children: React.ReactNode[] | React.ReactNode;
};

const OTPFormLayout = ({
  children,
  onSubmit,
  backButton,
}: OTPFormLayoutProps) => {
  return (
    <form>
      <Text
        type="h2"
        text="OTP Verification"
        priority="heading"
        decoration="underline"
        className={style.OTPLayout_form_header}
      />
      <div className={style.OTPLayout_section}>{children}</div>
      <div className={style.OTPLayout_cta}>
        <Button label="Back" priority="secondary" onClick={backButton} />
        <Button label="Next" onClick={onSubmit} />
      </div>
    </form>
  );
};

export default OTPFormLayout;
