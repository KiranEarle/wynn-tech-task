/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import Chevron from "@public/chevron_icon.svg";

import AnimatedHamburgerIcon from "@components/atoms/AnimatedHamburgerIcon";

import "./nav-bar.css";

export type NavBarProps = {
  logo: {
    src: string;
    href?: string;
    alt: string;
  };
  navList?: {
    label?: string;
    href?: string;
  }[];
  locals?: {
    label?: string;
  }[];
};

const NavBar = ({ logo, navList, locals }: NavBarProps) => {
  const [openMobileNav, setOpenMobileNav] = useState(false);
  return (
    <header className="Header-nav">
      <div className="Nav">
        <div className="Nav-container">
          <a className="Nav-logo-link" href={logo.href}>
            <img src={logo.src} alt={logo.alt} className="Nav-logo" />
          </a>
          <nav>
            <ol className="Nav-list">
              {navList?.map((item) => {
                return (
                  <li className="Nav-list-item" key={item.label}>
                    <a href={item.href}>{item.label?.toUpperCase()}</a>
                  </li>
                );
              })}
            </ol>
          </nav>
          <div className="Nav-local-container">
            <select className="Nav-local-select">
              {locals?.map((item) => {
                return (
                  <option key={item.label}>
                    {item.label?.toLocaleUpperCase()}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
      <div className="Nav-mobile">
        <a className="Nav-logo-link" href={logo.href}>
          <img src={logo.src} alt={logo.alt} className="Nav-logo" />
        </a>
        <AnimatedHamburgerIcon
          isOpen={openMobileNav}
          onClick={setOpenMobileNav}
        />
      </div>
      <div
        className={`Nav-list-mobile-container ${openMobileNav ? "" : "hide"}`}
      >
        <ol>
          {navList?.map((item) => {
            return (
              <li className="Nav-list-items-mobile" key={item.label}>
                <p>
                  <a href={item.href}>{item.label?.toUpperCase()}</a>
                </p>
                <Chevron
                  viewBox="0 0 100 100"
                  className="Nav-list-chevron-mobile"
                  height={20}
                  width={20}
                />
              </li>
            );
          })}
        </ol>
      </div>
    </header>
  );
};

export default NavBar;
