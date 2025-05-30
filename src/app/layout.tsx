import type { Metadata } from "next";
import localFont from "next/font/local";

import NavBar from "@components/molecules/NavBar";
import Footer from "@components/molecules/Footer";

import navBarProps from "@resources/navBarProps";
import footerProps from "./resources/footerProps";

import "./globals.css";

const avenirFont = localFont({
  src: [
    {
      path: "../../public/fonts/Avenir-LT-Std/Avenir-LT-Std-35-Light.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/Avenir-LT-Std/Avenir-LT-Std-65-Medium.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Avenir-LT-Std/Avenir-LT-Std-85-Heavy.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-avenir-lt",
});

const bigCaslon = localFont({
  src: [
    {
      path: "../../public/fonts/Big-Caslon/big-caslon-regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-big-caslon",
});

export const metadata: Metadata = {
  title: "Wynn Resorts",
  description: "Registration",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { logo, locals, navList } = navBarProps;
  const { columnOne, columnTwo, columnThree } = footerProps;
  return (
    <html lang="en">
      <body className={`${avenirFont.variable} ${bigCaslon.variable}`}>
        <NavBar logo={logo} locals={locals} navList={navList} />
        <main>{children}</main>
        <Footer
          columnOne={columnOne}
          columnTwo={columnTwo}
          columnThree={columnThree}
        />
      </body>
    </html>
  );
}
