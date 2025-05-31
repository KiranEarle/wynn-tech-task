"use client";

import Text from "@components/atoms/Text";
import InputField from "@components/atoms/InputField";
import SelectField from "@components/atoms/SelectField";

import WynnRegistrationsApp from "@app-types/WynnRegistrationsApp.types";

import countries from "@resources/countries";
import genders from "@resources/genders";

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
          className="Registration-form-headers"
        />
        <div className="Registration-name-section">
          <InputField
            label="First Name"
            placeholder="Enter first name..."
            required
            id="firstName"
          />
          <InputField
            label="Last Name"
            placeholder="Enter last name..."
            required
            id="lastName"
          />
        </div>
        <SelectField
          label="Gender"
          id="gender"
          required
          placeholder="Select gender..."
          options={genders}
          onChange={(e) => console.log(e.target.value)}
        />
        <SelectField
          label="Your residence country"
          id="country"
          required
          placeholder="Select residence country..."
          options={countries}
          onChange={(e) => console.log(e.target.value)}
        />
      </div>
      <div>
        <Text
          type="h2"
          text="Contact details"
          priority="heading"
          decoration="underline"
          className="Registration-form-headers"
        />
        <InputField
          label="Email"
          type="email"
          placeholder="Enter email address..."
          required
          id="email"
        />
      </div>
      <div></div>
    </form>
  );
};

export default RegistrationForm;
