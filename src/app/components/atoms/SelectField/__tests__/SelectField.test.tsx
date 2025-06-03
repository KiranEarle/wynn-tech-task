import { render, screen, fireEvent } from "@testing-library/react";
import SelectField from "../SelectField";

describe("SelectField Component", () => {
  const options = ["Option A", "Option B", "Option C"];

  it("renders with label and placeholder", () => {
    render(
      <SelectField
        id="test-select"
        label="Select Option"
        placeholder="Choose"
        options={options}
      />
    );

    expect(screen.getByText("Select Option")).toBeInTheDocument();
    expect(screen.getByTestId("select-input-field")).toHaveAttribute(
      "placeholder",
      "Choose"
    );
  });

  it("opens options list on label click", () => {
    render(
      <SelectField
        id="test-select"
        label="Select Option"
        placeholder="Choose"
        options={options}
      />
    );

    fireEvent.click(screen.getByText("Select Option"));

    options.forEach((option) => {
      expect(screen.getByDisplayValue(option)).toBeInTheDocument();
    });
  });

  it("calls onChange and onBlur when an option is clicked", () => {
    const handleChange = jest.fn();
    const handleBlur = jest.fn();

    render(
      <SelectField
        id="test-select"
        label="Select Option"
        placeholder="Choose"
        options={options}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    );

    fireEvent.click(screen.getByText("Select Option"));

    const option = screen.getByDisplayValue("Option B");
    fireEvent.mouseDown(option); // simulate focus handling
    fireEvent.click(option);

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  it("toggles dropdown on Enter key", () => {
    render(
      <SelectField
        id="test-select"
        label="Select Option"
        placeholder="Choose"
        options={options}
      />
    );

    const input = screen.getByTestId("select-input-field");
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(screen.getByDisplayValue("Option A")).toBeInTheDocument();
  });
});
