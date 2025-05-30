import { render, screen } from "@testing-library/react";
import Text from "../Text";

describe("Text component", () => {
  it("renders default paragraph with default class and empty text", () => {
    render(<Text />);
    const element = screen.getByRole("paragraph");
    expect(element.tagName.toLowerCase()).toBe("p");
    expect(element).toHaveClass("Text-p-normal");
  });

  it("renders specified text and type", () => {
    render(<Text type="h1" text="Welcome" />);
    const element = screen.getByText("Welcome");
    expect(element.tagName.toLowerCase()).toBe("h1");
    expect(element).toHaveClass("Text-h1-normal");
  });

  it("applies custom priority and className", () => {
    render(
      <Text
        type="span"
        text="Hello"
        priority="heading"
        className="custom-class"
      />
    );
    const element = screen.getByText("Hello");
    expect(element.tagName.toLowerCase()).toBe("span");
    expect(element).toHaveClass("Text-span-heading");
    expect(element).toHaveClass("custom-class");
  });

  it("renders different heading levels correctly", () => {
    const headingTypes = ["h2", "h3", "h4", "h5", "h6"] as const;
    headingTypes.forEach((type) => {
      render(<Text type={type} text={`Title ${type}`} />);
      const element = screen.getByText(`Title ${type}`);
      expect(element.tagName.toLowerCase()).toBe(type);
      expect(element).toHaveClass(`Text-${type}-normal`);
    });
  });
});
