/* eslint-disable react/display-name */
import { render, screen } from "@testing-library/react";
import { Dispatch, SetStateAction } from "react";
import RegistrationPage from "../RegistrationPage";

import useRegistrationPage from "@hooks/useRegistrationPage";
import WynnRegistrationsApp from "@app-types/WynnRegistrationsApp.types";

jest.mock("@public/info.svg", () => () => <svg data-testid="icon-svg" />);

// Mock the hook
jest.mock("@hooks/useRegistrationPage");

const mockUseRegistrationPage = useRegistrationPage as jest.MockedFunction<
  typeof useRegistrationPage
>;

describe("RegistrationPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const baseMock = {
    pageState: {
      state: "personalDetails",
      stepNumber: "1",
    } as WynnRegistrationsApp.PageStates,
    setPageState: jest.fn(),
    onSubmitPersonDetailsForm: jest.fn(),
    onSendOTP: jest.fn(),
    onVerifyCode: jest.fn(),
    personalDataForm: {
      firstName: {
        label: "First Name",
        value: "",
        isValid: "",
        isRequired: true,
      },
      lastName: {
        label: "Last Name",
        value: "",
        isValid: "",
        isRequired: true,
      },
      gender: { label: "Gender", value: "", isValid: "", isRequired: true },
      residency: { label: "Country", value: "", isValid: "", isRequired: true },
      email: { label: "Email", value: "", isValid: "", isRequired: true },
      phoneNumber: {
        label: "Phone",
        value: "",
        fullNumber: "",
        isValid: "",
        isRequired: true,
        code: "",
      },
    },
    updateForm: jest.fn() as (field: string, value: string) => void,
    inputValidation: jest.fn() as (
      field: string,
      value: string,
      regex: RegExp
    ) => void,
    updateFormPhoneNumber: jest.fn() as (field: string, value: string) => void,
    isTermChecked: { value: false, isValid: "" } as {
      value: boolean;
      isValid: string;
    },
    handleCheckTerms: jest.fn() as (checked: boolean) => void,
    sendOTPOption: "email" as WynnRegistrationsApp.OTSRequestTypes,
    setSendOTPOption: jest.fn() as Dispatch<
      SetStateAction<WynnRegistrationsApp.OTSRequestTypes>
    >,
    handleOTPOnChange: jest.fn() as (e) => void,
    otpCode: "",
    isSubmitForm: false,
  };

  it("renders RegistrationForm when pageState is 'personalDetails'", () => {
    mockUseRegistrationPage.mockReturnValue({ ...baseMock });
    render(<RegistrationPage />);

    expect(screen.getByText("Registration")).toBeInTheDocument();
    expect(screen.getByText("Step 1 of 3")).toBeInTheDocument();
    expect(screen.getByText("Personal Info")).toBeInTheDocument();
    expect(screen.getByTestId("first-name")).toBeInTheDocument();
    expect(screen.getByTestId("last-name")).toBeInTheDocument();
  });

  it("renders OTPSend when pageState is 'otpSendCode'", () => {
    mockUseRegistrationPage.mockReturnValue({
      ...baseMock,
      pageState: { state: "otpSendCode", stepNumber: "2" },
    });
    render(<RegistrationPage />);

    expect(screen.getByText("Step 2 of 3")).toBeInTheDocument();
    expect(screen.getByText(/send code/i)).toBeInTheDocument(); // Assumes OTPSend renders something like this
  });

  it("renders OTPVerify when pageState is 'otpVerify'", () => {
    mockUseRegistrationPage.mockReturnValue({
      ...baseMock,
      pageState: { state: "otpVerify", stepNumber: "3" },
    });
    render(<RegistrationPage />);

    expect(screen.getByText("Step 3 of 3")).toBeInTheDocument();
    expect(screen.getByText(/NEXT/i)).toBeInTheDocument(); // Assumes OTPVerify renders something like this
  });
});
