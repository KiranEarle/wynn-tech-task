import { renderHook, act } from "@testing-library/react";
import useRegistrationPage from "./useRegistrationPage";

import * as submitService from "@services/submitPersonalDetails";
import * as otpService from "@services/submitOTPRequestType";
import * as otpVerifyService from "@services/submitOTPCode";

jest.mock("@services/submitPersonalDetails");
jest.mock("@services/submitOTPRequestType");
jest.mock("@services/submitOTPCode");
jest.mock("@helpers/setViewToTop", () => jest.fn());

describe("useRegistrationPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns initial state", () => {
    const { result } = renderHook(() => useRegistrationPage());

    expect(result.current.pageState.state).toBe("personalDetails");
    expect(result.current.isTermChecked.value).toBe(false);
    expect(result.current.isSubmitForm).toBe(false);
  });

  it("updates form field correctly", () => {
    const { result } = renderHook(() => useRegistrationPage());

    act(() => {
      result.current.updateForm("firstName", "John");
    });

    expect(result.current.personalDataForm.firstName.value).toBe("John");
  });

  it("updates phone number correctly", () => {
    const { result } = renderHook(() => useRegistrationPage());

    act(() => {
      result.current.updateFormPhoneNumber("+1", "123456789");
    });

    const phone = result.current.personalDataForm.phoneNumber;
    expect(phone.code).toBe("+1");
    expect(phone.value).toBe("123456789");
    expect(phone.fullNumber).toBe("+1123456789");
  });

  it("toggles term agreement", () => {
    const { result } = renderHook(() => useRegistrationPage());

    act(() => {
      result.current.handleCheckTerms(true);
    });

    expect(result.current.isTermChecked.value).toBe(true);
  });

  it("validates input correctly", () => {
    const { result } = renderHook(() => useRegistrationPage());

    act(() => {
      result.current.updateForm("firstName", "1234"); // Invalid
      result.current.inputValidation("firstName", "1234", /^[A-Za-z]+$/);
    });

    expect(result.current.personalDataForm.firstName.isValid).toBe("not_valid");

    act(() => {
      result.current.inputValidation("firstName", "John", /^[A-Za-z]+$/);
    });

    expect(result.current.personalDataForm.firstName.isValid).toBe("");
  });

  it("submits personal details and updates page state", async () => {
    (submitService.default as jest.Mock).mockResolvedValueOnce({});

    const { result } = renderHook(() => useRegistrationPage());

    act(() => {
      // Provide valid data
      result.current.updateForm("firstName", "John");
      result.current.updateForm("lastName", "Doe");
      result.current.updateForm("gender", "Male");
      result.current.updateForm("email", "john@example.com");
      result.current.updateForm("residency", "USA");
      result.current.updateFormPhoneNumber("+1", "123456789");
      result.current.handleCheckTerms(true);
    });

    await act(async () => {
      await result.current.onSubmitPersonDetailsForm();
    });

    expect(submitService.default).toHaveBeenCalled();
    expect(result.current.pageState.state).toBe("otpSendCode");
  });

  it("handles OTP sending", async () => {
    (otpService.default as jest.Mock).mockResolvedValueOnce({});

    const { result } = renderHook(() => useRegistrationPage());

    await act(async () => {
      await result.current.onSendOTP();
    });

    expect(otpService.default).toHaveBeenCalledWith("phone");
    expect(result.current.pageState.state).toBe("otpVerify");
  });

  it("updates and verifies OTP", async () => {
    (otpVerifyService.default as jest.Mock).mockResolvedValueOnce({});
    const { result } = renderHook(() => useRegistrationPage());

    act(() => {
      result.current.handleOTPOnChange({ target: { value: "1234" } });
    });

    expect(result.current.otpCode).toBe("1234");

    await act(async () => {
      await result.current.onVerifyCode();
    });

    expect(otpVerifyService.default).toHaveBeenCalledWith("1234");
  });

  it("does not verify OTP if less than 4 digits", async () => {
    const { result } = renderHook(() => useRegistrationPage());

    act(() => {
      result.current.handleOTPOnChange({ target: { value: "12" } });
    });

    await act(async () => {
      await result.current.onVerifyCode();
    });

    expect(otpVerifyService.default).not.toHaveBeenCalled();
  });
});
