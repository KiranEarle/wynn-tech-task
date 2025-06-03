import { render, screen, fireEvent } from "@testing-library/react";
import NewsletterSubscription from "../NewsletterSubscription";

describe("NewsletterSubscription", () => {
  it("renders title and description", () => {
    render(<NewsletterSubscription />);
    expect(screen.getByText("Get News & Updates")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Get latest developments and exciting news on how we are shaping the future!"
      )
    ).toBeInTheDocument();
  });

  it("renders email input", () => {
    render(<NewsletterSubscription />);
    expect(
      screen.getByPlaceholderText("Your email address")
    ).toBeInTheDocument();
  });

  it("renders the newsletter button with testId", () => {
    render(<NewsletterSubscription />);
    const button = screen.getByTestId("newsletter");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Join The Newsletter".toUpperCase());
  });

  it("calls onClick when button is clicked", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation();

    render(<NewsletterSubscription />);
    const button = screen.getByTestId("newsletter");
    fireEvent.click(button);

    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});
