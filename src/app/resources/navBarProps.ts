import { NavBarProps } from "@components/molecules/NavBar/NavBar";

const navBarProps: NavBarProps = {
  logo: {
    src: "/images/logo.png",
    href: "/",
    alt: "wynn logo",
  },
  navList: [
    {
      label: "Rooms & Suites",
      href: "/",
    },
    {
      label: "Wynn Rewards",
      href: "/",
    },
    {
      label: "Offers",
      href: "/",
    },
    {
      label: "Dining",
      href: "/",
    },
    {
      label: "Entertainment",
      href: "/",
    },
    {
      label: "Meetings & Events",
      href: "/",
    },
  ],
  locals: [
    {
      label: "en",
    },
    {
      label: "ar",
    },
  ],
};

export default navBarProps;
