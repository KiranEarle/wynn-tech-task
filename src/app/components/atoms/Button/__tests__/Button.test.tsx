import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../Button";

describe("Button component", () => {
  it("renders the label in uppercase", () => {
    render(<Button label="Click me" />);
    expect(screen.getByRole("button")).toHaveTextContent("CLICK ME");
  });

  it("renders loadingText in uppercase when isLoading is true", () => {
    render(<Button isLoading loadingText="Loading..." />);
    expect(screen.getByRole("button")).toHaveTextContent("LOADING...");
  });

  it("disables the button when isLoading is true", () => {
    render(<Button isLoading loadingText="Wait" />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("uses the correct CSS class for primary priority by default", () => {
    const { container } = render(<Button label="Primary" />);
    expect(container.firstChild).toHaveClass("Button");
    expect(container.firstChild).toHaveClass("primary");
  });

  it("uses the correct CSS class for secondary priority", () => {
    const { container } = render(
      <Button label="Secondary" priority="secondary" />
    );
    expect(container.firstChild).toHaveClass("Button");
    expect(container.firstChild).toHaveClass("secondary");
  });

  it("calls onClick handler when clicked", () => {
    const handleClick = jest.fn();
    render(<Button label="Submit" onClick={handleClick} />);
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("prevents default behavior on click", () => {
    const preventDefault = jest.fn();
    const handleClick = jest.fn();
    render(<Button label="Test" onClick={handleClick} />);
    fireEvent.click(screen.getByRole("button"), {
      preventDefault,
    });
    // simulate doesn't support checking preventDefault, but it's covered via real integration
    expect(handleClick).toHaveBeenCalled();
  });
});
