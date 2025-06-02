/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-namespace */
namespace WynnRegistrationsApp {
  export type BaseField = {
    label?: string;
    isValid?: string;
    value?: string;
    isRequired?: boolean;
  };

  export type FormInputField = BaseField & HTMLInputElement;

  export type FormSelectField = BaseField & HTMLSelectElement;

  export type PersonalDetailsFormData = {
    firstName: FormInputField;
    lastName: FormInputField;
    gender: FormSelectField;
    residency: FormSelectField;
    email: FormInputField;
    phoneNumber: FormSelectField;
  };

  export type PersonalDetails = {
    firstName: string;
    lastName: string;
    gender: string;
    residency: string;
    email: string;
    phoneNumber: string;
  };

  export type PhoneNumberFieldData = {
    code: string;
    flagImgSrc: string;
    label: string;
    countryCode: string;
  };

  export type PageStates = {
    state: "personalDetails" | "otpSendCode" | "otpVerify";
    stepNumber: string;
  };
}

export default WynnRegistrationsApp;
