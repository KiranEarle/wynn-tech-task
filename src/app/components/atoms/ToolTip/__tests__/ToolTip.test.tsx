/* eslint-disable react/display-name */
import { render, screen } from "@testing-library/react";
import Tooltip from "../ToolTip";

jest.mock("@public/info.svg", () => () => <svg data-testid="icon-svg" />);

describe("Tooltip", () => {
  it("renders the tooltip text and icon", () => {
    render(<Tooltip text="This is a tooltip" />);

    expect(screen.getByText("This is a tooltip")).toBeInTheDocument();
    // The svg icon is rendered as an SVG element with a class name from styles.icon
    const icon = screen.getByRole("img", { hidden: true }); // SVGs may not have role img by default, fallback below
    expect(icon || screen.getByTestId("icon-svg")).toBeInTheDocument();
  });

  it("applies the default position class", () => {
    render(<Tooltip text="Position test" />);
    const tooltipDiv = screen.getByText("Position test");
    expect(tooltipDiv.className).toMatch(/left/);
  });

  it("applies the custom position class", () => {
    render(<Tooltip text="Position test" position="right" />);
    const tooltipDiv = screen.getByText("Position test");
    expect(tooltipDiv.className).toMatch(/right/);
  });
});
