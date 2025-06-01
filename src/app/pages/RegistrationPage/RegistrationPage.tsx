import Text from "@components/atoms/Text";
import RegistrationForm from "@components/organism/RegistrationForm";

import WynnRegistrationsApp from "@app-types/WynnRegistrationsApp.types";

import "./registration-page.css";

const RegistrationPage = () => {
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
        <Text type="h2" text="Step 1 of 3" priority="heading" />
      </div>
      <RegistrationForm
        formData={{} as WynnRegistrationsApp.PersonalDetailsFormData}
        inputOnChange={() => {}}
        onSubmit={async () => {}}
      />
    </div>
  );
};

export default RegistrationPage;
