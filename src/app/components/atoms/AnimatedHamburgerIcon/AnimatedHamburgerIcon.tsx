import style from "./animated-hamburger-icon.module.css";

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
    <button className={style.Hamburger} onClick={handleOnClick}>
      <div className={`${style.Hamburger_icon} ${isOpen ? style.active : ""}`}>
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
