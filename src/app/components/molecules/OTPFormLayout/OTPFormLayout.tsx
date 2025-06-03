import Text from "@components/atoms/Text";
import Button from "@components/atoms/Button";

import style from "./otp-form-layout.module.css";

export type OTPFormLayoutProps = {
  onSubmit: (e: unknown) => Promise<void>;
  backButton: () => void;
  children: React.ReactNode[] | React.ReactNode;
  isSubmitForm: boolean;
  loadingText: string;
};

const OTPFormLayout = ({
  children,
  onSubmit,
  backButton,
  isSubmitForm,
  loadingText,
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
        <Button
          testId="ots-form-back-button"
          label="Back"
          priority="secondary"
          onClick={backButton}
        />
        <Button
          testId="ots-form-submit-button"
          isLoading={isSubmitForm}
          loadingText={loadingText}
          label="Next"
          onClick={onSubmit}
        />
      </div>
    </form>
  );
};

export default OTPFormLayout;
