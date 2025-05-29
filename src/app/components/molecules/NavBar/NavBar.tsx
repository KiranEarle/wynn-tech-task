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
  return (
    <>
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
        <div className="Nav-mobile-hamburger"></div>
      </div>
    </>
  );
};

export default NavBar;
