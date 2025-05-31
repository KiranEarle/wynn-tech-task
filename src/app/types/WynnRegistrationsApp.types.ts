/* eslint-disable @typescript-eslint/no-namespace */
namespace WynnRegistrationsApp {
  export type BaseField = {
    label?: string;
    regex?: string;
    value?: string;
    isRequired?: boolean;
  };

  export type FormInputField = BaseField & HTMLInputElement;

  export type FormSelectField = BaseField & HTMLSelectElement;

  export type PersonalDetailsFormData = {
    firstName: FormInputField;
    lastName: FormInputField;
    gender: FormSelectField;
    email: FormInputField;
    phoneNumber: FormSelectField;
  };
}

export default WynnRegistrationsApp;
