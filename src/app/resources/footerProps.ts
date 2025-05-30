import { FooterProps } from "@components/molecules/Footer/Footer";

const footerProps: FooterProps = {
  columnOne: [
    { label: "Shop Home Collection", href: "/" },
    { label: "Gift Cards", href: "/" },
    { label: "Wynn Stories", href: "/" },
    { label: "Wyn Slots App", href: "/" },
    { label: "Mobile App", href: "/" },
    { label: "Responsible Gaming", href: "/" },
  ],
  columnTwo: [
    { label: "About Us", href: "/" },
    { label: "Careers", href: "/" },
    { label: "Investors Relations", href: "/" },
    { label: "Privacy Notice", href: "/" },
    { label: "Cookie Notice", href: "/" },
    { label: "Terms of Use", href: "/" },
    { label: "Hotel Information & Directory", href: "/" },
  ],
  columnThree: [
    { label: "Wynn Palace Cotai", href: "/" },
    { label: "Encore Boston Harbor", href: "/" },
    { label: "Wynn Macau", href: "/" },
  ],
  socialIcons: [
    { src: "/facebook-icon.svg", alt: "facebook-icon", href: "/" },
    { src: "/android-icon.svg", alt: "android-icon", href: "/" },
    { src: "/apple-icon.svg", alt: "apple-icon", href: "/" },
    { src: "/instagram-icon.svg", alt: "instagram-icon", href: "/" },
    { src: "/x-icon.svg", alt: "x-icon", href: "/" },
  ],
};

export default footerProps;
