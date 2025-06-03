/* eslint-disable @next/next/no-html-link-for-pages */
"use client";

import Text from "@components/atoms/Text";
import InputField from "@components/atoms/InputField";
import SelectField from "@components/atoms/SelectField";
import PhoneNumberInput from "@components/atoms/PhoneNumberInput";
import Checkbox from "@components/atoms/Checkbox";
import Button from "@components/atoms/Button";

import countries from "@resources/countries";
import genders from "@resources/genders";

import { textRegex, emailRegex, phoneNumberRegex } from "@constance/regex";

import WynnRegistrationsApp from "@app-types/WynnRegistrationsApp.types";

import style from "./registration-form.module.css";

type RegistrationFormProps = {
  inputOnChange: (field: string, value: string) => void;
  inputOnChangePhoneNumber: (code: string, number: string) => void;
  inputValidation: (field: string, value: string, regex: RegExp) => void;
  formData: WynnRegistrationsApp.PersonalDetailsFormData;
  onSubmit: () => Promise<void>;
  onCheckTerms: (checked: boolean) => void;
  isTermChecked: { value: boolean; isValid: string };
  isSubmitForm: boolean;
};

const RegistrationForm = (props: RegistrationFormProps) => {
  const {
    onSubmit,
    formData,
    inputOnChange,
    inputValidation,
    inputOnChangePhoneNumber,
    onCheckTerms,
    isTermChecked,
    isSubmitForm,
  } = props;
  return (
    <form className={style.Registration_form}>
      <div className={style.Registration_form_personal_info}>
        <Text
          type="h2"
          text="Personal Info"
          priority="heading"
          decoration="underline"
          className={style.Registration_form_headers}
        />
        <div className={style.Registration_name_section}>
          <InputField
            label={formData.firstName.label}
            value={formData.firstName.value}
            isValid={formData.firstName.isValid}
            tooltip="Enter first name"
            onChange={(e) => inputOnChange("firstName", e.target.value)}
            pattern="[A-Za-z]*"
            placeholder="Enter first name..."
            required
            id="firstName"
            onBlur={(e) =>
              inputValidation("firstName", e.target.value, textRegex)
            }
          />
          <InputField
            label={formData.lastName.label}
            value={formData.lastName.value}
            isValid={formData.lastName.isValid}
            tooltip="Enter last name"
            onChange={(e) => inputOnChange("lastName", e.target.value)}
            placeholder="Enter last name..."
            required
            id="lastName"
            onBlur={(e) =>
              inputValidation("lastName", e.target.value, textRegex)
            }
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
          tooltip="Select gender"
          onChange={(e) => inputOnChange("gender", e.target.value)}
          onBlur={(e) => inputValidation("gender", e.target.value, textRegex)}
        />
        <SelectField
          label="Your Residence Country"
          id="residency"
          required
          placeholder="Select residence country..."
          isValid={formData.residency.isValid}
          value={formData.residency.value}
          options={countries}
          tooltip="Select residency"
          onChange={(e) => inputOnChange("residency", e.target.value)}
          onBlur={(e) =>
            inputValidation("residency", e.target.value, textRegex)
          }
        />
      </div>
      <div>
        <Text
          type="h2"
          text="Contact details"
          priority="heading"
          decoration="underline"
          className={style.Registration_form_headers}
        />
        <InputField
          label={formData.email.label}
          value={formData.email.value}
          isValid={formData.email.isValid}
          onChange={(e) => inputOnChange("email", e.target.value)}
          onBlur={(e) => inputValidation("email", e.target.value, emailRegex)}
          tooltip="Enter email"
          type="email"
          placeholder="Enter email address..."
          required
          id="email"
        />
        <PhoneNumberInput
          label={formData.phoneNumber.label}
          required
          id="phoneNumber"
          value={formData.phoneNumber.value}
          isValid={formData.phoneNumber.isValid}
          tooltip="Select phone number"
          onChange={(numberDetails) => {
            const { countryCode, number } = numberDetails;
            inputOnChangePhoneNumber(countryCode, number);
          }}
          onBlur={(numberDetails) => {
            const { countryCode, number } = numberDetails;
            const phoneNumber = number ? `${countryCode}${number}` : "";
            inputValidation("phoneNumber", phoneNumber, phoneNumberRegex);
          }}
        />
      </div>
      <div className={style.Registration_cta}>
        <Checkbox
          label={() => {
            return (
              <span>
                I agree to the <a href="/">terms and conditions </a>
                and <a href="/">privacy policy.</a>
              </span>
            );
          }}
          isValid={isTermChecked.isValid}
          checked={isTermChecked.value}
          onClick={(value) => onCheckTerms(!value)}
        />
        <Button
          isLoading={isSubmitForm}
          loadingText="Submitting"
          label="Next"
          onClick={() => onSubmit()}
        />
      </div>
    </form>
  );
};

export default RegistrationForm;
