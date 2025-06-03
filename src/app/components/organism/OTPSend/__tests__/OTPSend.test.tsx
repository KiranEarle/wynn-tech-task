import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import WynnRegistrationsApp from "@app-types/WynnRegistrationsApp.types";

import OTPSend from "../OTPSend";

describe("OTPSend Component", () => {
  const mockOnSendOTP = jest.fn(() => Promise.resolve());
  const mockSetPageState = jest.fn();
  const mockSetSendOTPOption = jest.fn();

  const renderComponent = (sendOTPOption = "phone", isSubmitForm = false) => {
    return render(
      <OTPSend
        onSendOTP={mockOnSendOTP}
        setPageState={mockSetPageState}
        sendOTPOption={sendOTPOption as WynnRegistrationsApp.OTSRequestTypes}
        setSendOTPOption={mockSetSendOTPOption}
        isSubmitForm={isSubmitForm}
      />
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders radio options with correct labels", () => {
    renderComponent();

    expect(screen.getByLabelText("Send to Phone")).toBeInTheDocument();
    expect(screen.getByLabelText("Send to Email")).toBeInTheDocument();
  });

  it("triggers setSendOTPOption when selecting an option", () => {
    renderComponent();

    fireEvent.click(screen.getByLabelText("Send to Email"));
    expect(mockSetSendOTPOption).toHaveBeenCalledWith("email");
  });

  it("calls onSendOTP when Next button is clicked", async () => {
    renderComponent();

    const nextButton = screen.getByTestId("ots-form-submit-button");
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(mockOnSendOTP).toHaveBeenCalledTimes(1);
    });
  });

  it("calls setPageState when Back button is clicked", () => {
    renderComponent();

    const backButton = screen.getByTestId("ots-form-back-button");
    fireEvent.click(backButton);

    expect(mockSetPageState).toHaveBeenCalledWith({
      state: "personalDetails",
      stepNumber: "1",
    });
  });

  it("displays loadingText when isSubmitForm is true", () => {
    renderComponent("phone", true);

    expect(screen.getByText("SENDING CODE")).toBeInTheDocument();
  });
});
