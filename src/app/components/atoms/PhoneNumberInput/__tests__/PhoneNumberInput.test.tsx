/* eslint-disable react/display-name */
import { render, screen, fireEvent } from "@testing-library/react";
import PhoneNumberInput from "../PhoneNumberInput";

// Mocks
jest.mock("@components/atoms/ToolTip", () => ({ text }: { text: string }) => (
  <div data-testid="tooltip">{text}</div>
));
jest.mock("@public/tick.svg", () => () => <svg data-testid="tick-icon" />);
jest.mock("@public/search.svg", () => () => <svg data-testid="search-icon" />);
jest.mock("@resources/phoneNumberLocals", () => [
  {
    code: "US",
    countryCode: "+1",
    label: "United States",
    flagImgSrc: "/us.svg",
  },
  {
    code: "FR",
    countryCode: "+33",
    label: "France",
    flagImgSrc: "/fr.svg",
  },
]);

describe("PhoneNumberInput", () => {
  it("renders with label and tooltip", () => {
    render(
      <PhoneNumberInput
        id="phone"
        label="Phone Number"
        tooltip="Your phone number"
      />
    );
    expect(screen.getByText(/Phone Number/)).toBeInTheDocument();
    expect(screen.getByTestId("tooltip")).toHaveTextContent(
      "Your phone number"
    );
  });

  it("displays initial region code placeholder", () => {
    render(<PhoneNumberInput id="phone" value="" />);
    expect(screen.getByPlaceholderText("+1")).toBeInTheDocument();
  });

  it("fires onChange only for numeric input", () => {
    const onChange = jest.fn();
    render(<PhoneNumberInput id="phone" onChange={onChange} value="" />);
    const input = screen.getByPlaceholderText("(____)-______");
    fireEvent.change(input, { target: { value: "abc123" } });
    expect(onChange).not.toHaveBeenCalled();

    fireEvent.change(input, { target: { value: "123456" } });
    expect(onChange).toHaveBeenCalledWith({
      number: "123456",
      code: "US",
      countryCode: "+1",
      label: "United States",
      flagImgSrc: "/us.svg",
    });
  });

  it("fires onBlur with current number and country", () => {
    const onBlur = jest.fn();
    render(<PhoneNumberInput id="phone" onBlur={onBlur} value="987654" />);
    const input = screen.getByPlaceholderText("(____)-______");
    fireEvent.blur(input);
    expect(onBlur).toHaveBeenCalledWith({
      number: "987654",
      code: "US",
      countryCode: "+1",
      label: "United States",
      flagImgSrc: "/us.svg",
    });
  });

  it("toggles country list dropdown and selects a new country", () => {
    render(<PhoneNumberInput id="phone" />);
    const toggle = screen.getByTestId("flag");
    fireEvent.click(toggle);
    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();

    const franceOption = screen.getByTestId("France");
    fireEvent.click(franceOption);

    expect(screen.getByPlaceholderText("+33")).toBeInTheDocument();
  });

  it("filters country options via search", () => {
    render(<PhoneNumberInput id="phone" />);
    fireEvent.click(screen.getByTestId("flag"));
    fireEvent.change(screen.getByPlaceholderText("Search"), {
      target: { value: "france" },
    });

    expect(screen.getByTestId("France")).toBeInTheDocument();
    expect(screen.queryByTestId("United States")).not.toBeInTheDocument();
  });
});
