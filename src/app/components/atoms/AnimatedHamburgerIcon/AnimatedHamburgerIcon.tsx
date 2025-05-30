import "./animated-hamburger-icon.css";

export type AnimatedHamburgerIconProps = {
  isOpen: boolean;
  onClick: (isOpen: boolean) => void;
};

const AnimatedHamburgerIcon = ({
  isOpen,
  onClick,
}: AnimatedHamburgerIconProps) => {
  const handleOnClick = () => {
    onClick(!isOpen);
  };
  return (
    <button className="Hamburger" onClick={handleOnClick}>
      <div className={`Hamburger-icon ${isOpen ? "active" : ""}`}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </button>
  );
};

export default AnimatedHamburgerIcon;
