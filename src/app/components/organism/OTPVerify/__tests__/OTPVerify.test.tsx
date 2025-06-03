import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import OTPVerify from "../OTPVerify";

describe("OTPVerify Component", () => {
  const mockOnVerifyCode = jest.fn(() => Promise.resolve());
  const mockSetPageState = jest.fn();
  const mockOnSendOTP = jest.fn(() => Promise.resolve());
  const mockHandleOTPOnChange = jest.fn();

  const baseProps = {
    onVerifyCode: mockOnVerifyCode,
    setPageState: mockSetPageState,
    onSendOTP: mockOnSendOTP,
    handleOTPOnChange: mockHandleOTPOnChange,
    otpCode: "123",
    isSubmitForm: false,
    phoneNumber: "1234567890",
    emailAddress: "test@example.com",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders email sent message when sendOTPOption is email", () => {
    render(<OTPVerify {...baseProps} sendOTPOption="email" />);
    expect(screen.getByText("Please check your email")).toBeInTheDocument();
    expect(
      screen.getByText(`We've sent a code to ${baseProps.emailAddress}`)
    ).toBeInTheDocument();
  });

  it("renders phone sent message when sendOTPOption is phone", () => {
    render(<OTPVerify {...baseProps} sendOTPOption="phone" />);
    expect(
      screen.getByText(`We've sent a code to your phone number ending in 890`)
    ).toBeInTheDocument();
  });

  it("renders input boxes reflecting otpCode", () => {
    render(<OTPVerify {...baseProps} sendOTPOption="email" />);
    const boxes = screen
      .getAllByText(/^[0-9]$/)
      .filter((box) => box.textContent);
    expect(boxes.map((b) => b.textContent)).toEqual(["1", "2", "3"]);
  });

  it("calls handleOTPOnChange when input is changed", () => {
    render(<OTPVerify {...baseProps} sendOTPOption="email" />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "4567" } });
    expect(mockHandleOTPOnChange).toHaveBeenCalled();
  });

  it("focuses the hidden input when wrapper is clicked", () => {
    render(<OTPVerify {...baseProps} sendOTPOption="email" />);
    const wrapper = screen.getByRole("textbox").parentElement!;
    fireEvent.click(wrapper);
    expect(document.activeElement).toBe(screen.getByRole("textbox"));
  });

  it("calls onVerifyCode when clicking Next", async () => {
    render(<OTPVerify {...baseProps} sendOTPOption="email" />);
    const nextButton = screen.getByTestId("ots-form-submit-button");
    fireEvent.click(nextButton);
    await waitFor(() => {
      expect(mockOnVerifyCode).toHaveBeenCalledTimes(1);
    });
  });

  it("calls onSendOTP when clicking resend link", async () => {
    render(<OTPVerify {...baseProps} sendOTPOption="email" />);
    const resendLink = screen.getByText("Click to resend.");
    fireEvent.click(resendLink);
    await waitFor(() => {
      expect(mockOnSendOTP).toHaveBeenCalledTimes(1);
    });
  });

  it("shows loading text when form is submitting", () => {
    render(
      <OTPVerify {...baseProps} sendOTPOption="email" isSubmitForm={true} />
    );
    expect(screen.getByText("VERIFYING")).toBeInTheDocument();
  });
});
