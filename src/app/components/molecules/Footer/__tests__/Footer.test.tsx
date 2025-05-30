import { render, screen } from "@testing-library/react";
import Footer, { FooterProps } from "../Footer";

// Mock NewsletterSubscription component
// eslint-disable-next-line react/display-name
jest.mock("@components/molecules/NewsletterSubscription", () => () => (
  <div data-testid="newsletter">Newsletter Component</div>
));

const mockProps: FooterProps = {
  columnOne: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
  ],
  columnTwo: [
    { label: "Events", href: "/events" },
    { label: "Dining", href: "/dining" },
  ],
  columnThree: [
    { label: "Contact", href: "/contact" },
    { label: "Privacy", href: "/privacy" },
  ],
  socialIcons: [
    {
      src: "/facebook.svg",
      href: "https://facebook.com",
      alt: "Facebook",
    },
    {
      src: "/instagram.svg",
      href: "https://instagram.com",
      alt: "Instagram",
    },
  ],
};

describe("Footer", () => {
  it("renders newsletter component", () => {
    render(<Footer {...mockProps} />);
    expect(screen.getByTestId("newsletter")).toBeInTheDocument();
  });

  it("renders all column links", () => {
    render(<Footer {...mockProps} />);
    mockProps.columnOne
      .concat(mockProps.columnTwo, mockProps.columnThree)
      .forEach((item) => {
        expect(screen.getByText(item.label)).toBeInTheDocument();
      });
  });

  it("renders address and contact info", () => {
    render(<Footer {...mockProps} />);
    expect(screen.getByText(/Wynn and Encore Las Vegas/)).toBeInTheDocument();
    expect(screen.getByText(/\+1 \(702\) 770-7000/)).toBeInTheDocument();
  });

  it("renders social icons", () => {
    render(<Footer {...mockProps} />);
    mockProps.socialIcons.forEach((icon) => {
      const img = screen.getByAltText(icon.alt);
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute("src", icon.src);
    });
  });
});
