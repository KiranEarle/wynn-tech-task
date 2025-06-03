/* eslint-disable react/display-name */
import { render, screen, fireEvent } from "@testing-library/react";
import Checkbox from "../Checkbox";

jest.mock("@public/tick.svg", () => () => <svg data-testid="tick-icon" />);

describe("Checkbox component", () => {
  it("renders without crashing", () => {
    render(<Checkbox isValid="" id="test-checkbox" />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
  });

  it("renders the label content when provided", () => {
    render(
      <Checkbox
        isValid=""
        id="test-checkbox"
        label={() => <span>Accept terms</span>}
      />
    );
    expect(screen.getByText("Accept terms")).toBeInTheDocument();
  });

  it("applies the correct validation class", () => {
    const { container } = render(<Checkbox isValid="valid" id="checkbox-1" />);
    expect(container.firstChild).toHaveClass("Checkbox_container");
    expect(container.firstChild).toHaveClass("valid");
  });

  it("calls onClick when label is clicked", () => {
    const mockOnClick = jest.fn();
    render(
      <Checkbox
        isValid=""
        id="checkbox-4"
        checked={false}
        onClick={mockOnClick}
        label={() => <span>Label Click</span>}
      />
    );
    fireEvent.click(screen.getByText("Label Click"));
    expect(mockOnClick).toHaveBeenCalledWith(false);
  });
});
