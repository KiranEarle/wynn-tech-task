import { render, screen, fireEvent } from "@testing-library/react";
import Radio from "../Radio";

describe("Radio component", () => {
  it("renders with label", () => {
    render(<Radio label="Option A" value="A" name="group1" />);
    expect(screen.getByText("Option A")).toBeInTheDocument();
  });

  it("renders with correct value and name", () => {
    render(<Radio label="Option B" value="B" name="group1" />);
    const input = screen.getByRole("radio") as HTMLInputElement;
    expect(input.value).toBe("B");
    expect(input.name).toBe("group1");
  });

  it("is checked when prop is true", () => {
    render(<Radio label="Selected" checked value="X" name="group1" />);
    const input = screen.getByRole("radio") as HTMLInputElement;
    expect(input.checked).toBe(true);
  });

  it("calls onChange when clicked", () => {
    const onChange = jest.fn();
    render(
      <Radio label="Choose me" onChange={onChange} value="Y" name="group1" />
    );
    const input = screen.getByRole("radio");
    fireEvent.click(input);
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
