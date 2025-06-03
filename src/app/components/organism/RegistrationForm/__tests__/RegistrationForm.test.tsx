/* eslint-disable react/display-name */
import { render, screen, fireEvent } from "@testing-library/react";
import WynnRegistrationsApp from "@app-types/WynnRegistrationsApp.types";

import RegistrationForm from "../RegistrationForm";

jest.mock("@public/info.svg", () => () => <svg data-testid="icon-svg" />);

const mockFormData = {
  firstName: { label: "First Name", value: "", isValid: "" },
  lastName: { label: "Last Name", value: "", isValid: "" },
  gender: { label: "Gender", value: "", isValid: "" },
  residency: { label: "Residency", value: "", isValid: "" },
  email: { label: "Email", value: "", isValid: "" },
  phoneNumber: { label: "Phone", value: "", isValid: "" },
} as WynnRegistrationsApp.PersonalDetailsFormData;

const setup = () => {
  const inputOnChange = jest.fn();
  const inputValidation = jest.fn();
  const inputOnChangePhoneNumber = jest.fn();
  const onSubmit = jest.fn(() => Promise.resolve());
  const onCheckTerms = jest.fn();

  render(
    <RegistrationForm
      formData={mockFormData}
      inputOnChange={inputOnChange}
      inputValidation={inputValidation}
      inputOnChangePhoneNumber={inputOnChangePhoneNumber}
      onSubmit={onSubmit}
      onCheckTerms={onCheckTerms}
      isTermChecked={{ value: false, isValid: "" }}
      isSubmitForm={false}
    />
  );

  return {
    inputOnChange,
    inputValidation,
    inputOnChangePhoneNumber,
    onSubmit,
    onCheckTerms,
  };
};

describe("RegistrationForm", () => {
  it("renders all input fields", () => {
    setup();

    expect(screen.getByTestId("first-name")).toBeInTheDocument();
    expect(screen.getByTestId("last-name")).toBeInTheDocument();
    expect(screen.getByTestId("email")).toBeInTheDocument();
    expect(screen.getByTestId("phone-number")).toBeInTheDocument();
  });

  it("calls inputOnChange when typing in first name", () => {
    const { inputOnChange } = setup();
    const input = screen.getByTestId("first-name");
    fireEvent.change(input, { target: { value: "John" } });

    expect(inputOnChange).toHaveBeenCalledWith("firstName", "John");
  });

  it("calls onSubmit when clicking submit", () => {
    const { onSubmit } = setup();
    const button = screen.getByRole("button", { name: /next/i });
    fireEvent.click(button);

    expect(onSubmit).toHaveBeenCalled();
  });
});
