import { render, screen, fireEvent } from "@testing-library/react";
import Input from "../InputField";

// Mock the Tooltip component
jest.mock("@components/atoms/ToolTip", () => ({
  __esModule: true,
  default: ({ text }: { text: string }) => (
    <div data-testid="tooltip">{text}</div>
  ),
}));

describe("Input component", () => {
  it("renders the input field with label", () => {
    render(<Input id="test-input" label="Username" />);
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
  });

  it("renders a required asterisk when required is true", () => {
    render(<Input id="required-input" label="Email" required />);
    expect(screen.getByText(/Email \*/)).toBeInTheDocument();
  });

  it("renders tooltip when tooltip text is provided", () => {
    render(
      <Input
        id="tooltip-input"
        label="Password"
        tooltip="Password must be at least 8 characters"
      />
    );
    expect(screen.getByTestId("tooltip")).toHaveTextContent(
      "Password must be at least 8 characters"
    );
  });

  it("applies the correct validation class", () => {
    const { container } = render(
      <Input id="valid-input" label="Email" isValid="valid" />
    );
    const input = container.querySelector("input");
    expect(input).toHaveClass("valid");
  });

  it("fires onChange handler when input value changes", () => {
    const handleChange = jest.fn();
    render(
      <Input id="change-input" label="Name" onChange={handleChange} value="" />
    );
    const input = screen.getByLabelText(/Name/);
    fireEvent.change(input, { target: { value: "John" } });
    expect(handleChange).toHaveBeenCalled();
  });
});
