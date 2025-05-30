/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import NewsletterSubscription from "@components/molecules/NewsletterSubscription";

import "./footer.css";

export type FooterProps = {
  columnOne: {
    label: string;
    href: string;
  }[];
  columnTwo: {
    label: string;
    href: string;
  }[];
  columnThree: {
    label: string;
    href: string;
  }[];
};

const Footer = ({ columnOne, columnTwo, columnThree }: FooterProps) => {
  return (
    <footer>
      <NewsletterSubscription />
      <div className="Footer-content-container">
        <div className="Footer-content-section">
          <div className="Footer-content">
            <ul className="Footer-content-list">
              {columnOne.map((item) => {
                return (
                  <li className="Footer-content-list-item" key={item.label}>
                    <a href={item.href}>{item.label}</a>
                  </li>
                );
              })}
            </ul>
            <ul className="Footer-content-list">
              {columnTwo.map((item) => {
                return (
                  <li className="Footer-content-list-item" key={item.label}>
                    <a href={item.href}>{item.label}</a>
                  </li>
                );
              })}
            </ul>
            <ul className="Footer-content-list">
              {columnThree.map((item) => {
                return (
                  <li className="Footer-content-list-item" key={item.label}>
                    <a href={item.href}>{item.label}</a>
                  </li>
                );
              })}
            </ul>
            <div className="Footer-address">
              <p>Wynn and Encore Las Vegas</p>
              <p>3131 Las Vegas Blvd. Las Vegas, NV 89109</p>
              <p>+1 (702) 770-7000</p>
              <div className="Footer-socials">
                <span>Connect with us.</span>
                <div className="Footer-socials-icons">
                  <a href="/">
                    <img
                      src="/facebook-icon.svg"
                      className="Footer-icon"
                      alt="facebook-icon"
                    />
                  </a>
                  <a href="/">
                    <img
                      src="/android-icon.svg"
                      className="Footer-icon"
                      alt="facebook-icon"
                    />
                  </a>
                  <a href="/">
                    <img
                      src="/apple-icon.svg"
                      className="Footer-icon"
                      alt="facebook-icon"
                    />
                  </a>
                  <a href="/">
                    <img
                      src="/instagram-icon.svg"
                      className="Footer-icon"
                      alt="facebook-icon"
                    />
                  </a>
                  <a href="/">
                    <img
                      src="/x-icon.svg"
                      className="Footer-icon"
                      alt="facebook-icon"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="Footer-copyright">
          <p>Do Not Sell Or Share My Data</p>
          <p>© 2024 Wynn Resorts Holdings, LLC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
