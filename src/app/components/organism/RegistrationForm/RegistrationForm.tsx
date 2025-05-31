import Text from "@components/atoms/Text";
import WynnRegistrationsApp from "@app-types/WynnRegistrationsApp.types";

import "./registration-form.css";

type RegistrationFormProps = {
  inputOnChange: (field: string, value) => void;
  formData: WynnRegistrationsApp.PersonalDetailsFormData;
  onSubmit: () => Promise<void>;
};

const RegistrationForm = ({}: RegistrationFormProps) => {
  return (
    <form className="Registration-form">
      <div className="Registration-form-personal-info">
        <Text
          type="h2"
          text="Personal Info"
          priority="heading"
          decoration="underline"
        />
      </div>
      <div>
        <Text type="h2" text="Contact details" priority="heading" />
      </div>
      <div></div>
    </form>
  );
};

export default RegistrationForm;
