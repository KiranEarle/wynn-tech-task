import { render, screen, fireEvent } from "@testing-library/react";
import OTPFormLayout from "../OTPFormLayout";

describe("OTPFormLayout", () => {
  const mockOnSubmit = jest.fn();
  const mockBackButton = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
    mockBackButton.mockClear();
  });

  it("renders the heading and children", () => {
    render(
      <OTPFormLayout
        onSubmit={mockOnSubmit}
        backButton={mockBackButton}
        isSubmitForm={false}
        loadingText="Loading..."
      >
        <p>OTP Input Field</p>
      </OTPFormLayout>
    );

    expect(screen.getByText("OTP Verification")).toBeInTheDocument();
    expect(screen.getByText("OTP Input Field")).toBeInTheDocument();
  });

  it("renders the Back and Next buttons with correct labels", () => {
    render(
      <OTPFormLayout
        onSubmit={mockOnSubmit}
        backButton={mockBackButton}
        isSubmitForm={false}
        loadingText="Loading..."
      >
        <p>OTP Input Field</p>
      </OTPFormLayout>
    );

    expect(screen.getByTestId("ots-form-back-button")).toHaveTextContent(
      "BACK"
    );
    expect(screen.getByTestId("ots-form-submit-button")).toHaveTextContent(
      "NEXT"
    );
  });

  it("calls backButton when Back is clicked", () => {
    render(
      <OTPFormLayout
        onSubmit={mockOnSubmit}
        backButton={mockBackButton}
        isSubmitForm={false}
        loadingText="Loading..."
      >
        <p>OTP Input Field</p>
      </OTPFormLayout>
    );

    fireEvent.click(screen.getByTestId("ots-form-back-button"));
    expect(mockBackButton).toHaveBeenCalledTimes(1);
  });

  it("calls onSubmit when Next is clicked", () => {
    render(
      <OTPFormLayout
        onSubmit={mockOnSubmit}
        backButton={mockBackButton}
        isSubmitForm={false}
        loadingText="Loading..."
      >
        <p>OTP Input Field</p>
      </OTPFormLayout>
    );

    fireEvent.click(screen.getByTestId("ots-form-submit-button"));
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });

  it("displays loadingText when isSubmitForm is true", () => {
    render(
      <OTPFormLayout
        onSubmit={mockOnSubmit}
        backButton={mockBackButton}
        isSubmitForm={true}
        loadingText="Verifying..."
      >
        <p>OTP Input Field</p>
      </OTPFormLayout>
    );

    expect(screen.getByText("VERIFYING...")).toBeInTheDocument();
  });
});
