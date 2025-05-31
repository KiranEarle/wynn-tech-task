"use client";

// import { useState } from "react";

import Text from "@components/atoms/Text";
import InputField from "@components/atoms/InputField";
import SelectField from "@components/atoms/SelectField";

import WynnRegistrationsApp from "@app-types/WynnRegistrationsApp.types";

import "./registration-form.css";

type RegistrationFormProps = {
  inputOnChange: (field: string, value) => void;
  formData: WynnRegistrationsApp.PersonalDetailsFormData;
  onSubmit: () => Promise<void>;
};

const RegistrationForm = ({}: RegistrationFormProps) => {
  // const [gender, setGender] = useState("");
  const tempOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ];
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
        <div>
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
          options={tempOptions}
        />
        <SelectField label="Your residence country" required />
      </div>
      <div>
        <Text
          type="h2"
          text="Contact details"
          priority="heading"
          decoration="underline"
          className="Registration-form-headers"
        />
        <InputField label="Email" required id="email" />
      </div>
      <div></div>
    </form>
  );
};

export default RegistrationForm;
