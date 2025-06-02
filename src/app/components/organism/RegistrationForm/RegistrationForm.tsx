/* eslint-disable @next/next/no-html-link-for-pages */
"use client";

import { useState } from "react";

import Text from "@components/atoms/Text";
import InputField from "@components/atoms/InputField";
import SelectField from "@components/atoms/SelectField";
import PhoneNumberInput from "@components/atoms/PhoneNumberInput";
import Checkbox from "@components/atoms/Checkbox";
import Button from "@components/atoms/Button";

import countries from "@resources/countries";
import genders from "@resources/genders";

import WynnRegistrationsApp from "@app-types/WynnRegistrationsApp.types";

import "./registration-form.css";

type RegistrationFormProps = {
  inputOnChange: (field: string, value: string) => void;
  validateEmailInput: (field: string, value: string) => void;
  validateTextInput: (field: string, value: string) => void;
  validateSelectInput: (field: string, value: string) => void;
  validatePhoneNumberInput: (field: string, value: string) => void;
  formData: WynnRegistrationsApp.PersonalDetailsFormData;
  onSubmit: () => Promise<void>;
};

const RegistrationForm = (props: RegistrationFormProps) => {
  const {
    onSubmit,
    formData,
    inputOnChange,
    validateEmailInput,
    validateTextInput,
  } = props;
  const [isChecked, setIsChecked] = useState(false);
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
            label={formData.firstName.label}
            value={formData.firstName.value}
            isValid={formData.firstName.isValid}
            onChange={(e) => inputOnChange("firstName", e.target.value)}
            placeholder="Enter first name..."
            required
            id="firstName"
            onBlur={(e) => validateTextInput("firstName", e.target.value)}
          />
          <InputField
            label={formData.lastName.label}
            value={formData.lastName.value}
            isValid={formData.lastName.isValid}
            onChange={(e) => inputOnChange("lastName", e.target.value)}
            placeholder="Enter last name..."
            required
            id="lastName"
            onBlur={(e) => validateTextInput("lastName", e.target.value)}
          />
        </div>
        <SelectField
          label={formData.gender.label}
          id="gender"
          required
          placeholder="Select gender..."
          isValid={formData.gender.isValid}
          value={formData.gender.value}
          options={genders}
          onChange={(e) => inputOnChange("gender", e.target.value)}
          onBlur={(e) => validateTextInput("gender", e.target.value)}
        />
        <SelectField
          label="Your Residence Country"
          id="residency"
          required
          placeholder="Select residence country..."
          isValid={formData.residency.isValid}
          value={formData.residency.value}
          options={countries}
          onChange={(e) => inputOnChange("residency", e.target.value)}
          onBlur={(e) => validateTextInput("residency", e.target.value)}
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
          label={formData.email.label}
          value={formData.email.value}
          isValid={formData.email.isValid}
          onChange={(e) => inputOnChange("email", e.target.value)}
          onBlur={(e) => validateEmailInput("email", e.target.value)}
          type="email"
          placeholder="Enter email address..."
          required
          id="email"
        />
        <PhoneNumberInput
          label="Phone Number"
          required
          id="phoneNumber"
          onChange={(data) => console.log({ data })}
        />
      </div>
      <div className="Registration-cta">
        <Checkbox
          label={() => {
            return (
              <span>
                I agree to the <a href="/">terms and conditions </a>
                and <a href="/">privacy policy.</a>
              </span>
            );
          }}
          checked={isChecked}
          onClick={(value) => setIsChecked(!value)}
        />
        <Button label="Next" onClick={() => onSubmit()} />
      </div>
    </form>
  );
};

export default RegistrationForm;
