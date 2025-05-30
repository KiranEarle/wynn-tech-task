import NavBar, { NavBarProps } from "../NavBar";
import { AnimatedHamburgerIconProps } from "@components/atoms/AnimatedHamburgerIcon/AnimatedHamburgerIcon";

import { render, screen, fireEvent } from "@testing-library/react";

jest.mock("@components/atoms/AnimatedHamburgerIcon", () => ({
  __esModule: true,
  default: ({ isOpen, onClick }: AnimatedHamburgerIconProps) => (
    <button onClick={() => onClick(!isOpen)} data-testid="hamburger">
      {isOpen ? "Close" : "Open"}
    </button>
  ),
}));

// eslint-disable-next-line react/display-name
jest.mock("@public/chevron_icon.svg", () => () => (
  <svg data-testid="chevron-icon" />
));

describe("NavBar", () => {
  const mockProps: NavBarProps = {
    logo: {
      src: "/logo.png",
      href: "/",
      alt: "Company Logo",
    },
    navList: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
    ],
    locals: [{ label: "en" }, { label: "fr" }],
  };

  const setUp = (props: NavBarProps) => {
    return render(<NavBar {...props} />);
  };

  it("renders logo correctly", () => {
    setUp(mockProps);
    const logo = screen.getAllByAltText("Company Logo");
    expect(logo.length).toBeGreaterThan(0);
    expect(logo[0]).toHaveAttribute("src", mockProps.logo.src);
  });

  it("renders navigation links", () => {
    setUp(mockProps);
    expect(screen.getAllByText("HOME")[0]).toBeInTheDocument();
    expect(screen.getAllByText("ABOUT")[0]).toBeInTheDocument();
  });

  it("renders locale options", () => {
    setUp(mockProps);
    expect(screen.getAllByText("EN")[0]).toBeInTheDocument();
    expect(screen.getAllByText("FR")[0]).toBeInTheDocument();
  });

  it("toggles mobile navigation on hamburger click", () => {
    setUp(mockProps);
    const hamburger = screen.getByTestId("hamburger");
    fireEvent.click(hamburger);
    expect(screen.getAllByText("HOME")[0]).toBeInTheDocument();
    expect(screen.getAllByTestId("chevron-icon")[0]).toBeInTheDocument();
  });
});
