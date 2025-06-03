import { render, screen, fireEvent } from "@testing-library/react";
import submitEmailSubscription from "@services/submitEmailSubscription";
import NewsletterSubscription from "../NewsletterSubscription";

jest.mock("@services/submitEmailSubscription");

describe("NewsletterSubscription", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    render(<NewsletterSubscription />);
    expect(
      screen.getByPlaceholderText(/your email address/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /join the newsletter/i })
    ).toBeInTheDocument();
  });

  it("updates email state on input change", () => {
    render(<NewsletterSubscription />);
    const input = screen.getByPlaceholderText(/your email address/i);

    fireEvent.change(input, { target: { value: "test@example.com" } });
    expect((input as HTMLInputElement).value).toBe("test@example.com");
  });

  it("does not call submitEmailSubscription if email is invalid", () => {
    render(<NewsletterSubscription />);
    const input = screen.getByPlaceholderText(/your email address/i);
    const button = screen.getByRole("button", { name: /join the newsletter/i });

    fireEvent.change(input, { target: { value: "invalid-email" } });
    fireEvent.click(button);

    expect(submitEmailSubscription).not.toHaveBeenCalled();
  });

  it("calls submitEmailSubscription with valid email", () => {
    render(<NewsletterSubscription />);
    const input = screen.getByPlaceholderText(/your email address/i);
    const button = screen.getByRole("button", { name: /join the newsletter/i });

    fireEvent.change(input, { target: { value: "valid@example.com" } });
    fireEvent.click(button);

    expect(submitEmailSubscription).toHaveBeenCalledWith("valid@example.com");
  });
});
