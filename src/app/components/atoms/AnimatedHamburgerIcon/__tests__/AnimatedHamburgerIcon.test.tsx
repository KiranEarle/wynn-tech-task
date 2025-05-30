import { render, screen, fireEvent } from "@testing-library/react";
import AnimatedHamburgerIcon from "../AnimatedHamburgerIcon";

describe("AnimatedHamburgerIcon", () => {
  it("renders the hamburger button", () => {
    render(<AnimatedHamburgerIcon isOpen={false} onClick={() => {}} />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("calls onClick with toggled value", () => {
    const handleClick = jest.fn();
    render(<AnimatedHamburgerIcon isOpen={false} onClick={handleClick} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledWith(true);
  });

  it('has the "active" class when isOpen is true', () => {
    render(<AnimatedHamburgerIcon isOpen={true} onClick={() => {}} />);
    const icon = screen.getByRole("button").firstChild;
    expect(icon).toHaveClass("Hamburger-icon active");
  });

  it('does not have the "active" class when isOpen is false', () => {
    render(<AnimatedHamburgerIcon isOpen={false} onClick={() => {}} />);
    const icon = screen.getByRole("button").firstChild;
    expect(icon).toHaveClass("Hamburger-icon");
    expect(icon).not.toHaveClass("active");
  });
});
