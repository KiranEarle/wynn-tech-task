import style from "./button.module.css";

export type ButtonProps = {
  label?: string;
  isLoading?: boolean;
  loadingText?: string;
  priority?: "primary" | "secondary";
  testId?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = (props: ButtonProps) => {
  const {
    label,
    isLoading,
    onClick,
    loadingText,
    priority = "primary",
    testId,
    ...buttonProps
  } = props;
  const handleOnClick = (e) => {
    e.preventDefault();

    if (onClick) {
      onClick(e);
    }
  };
  return (
    <button
      data-testid={testId}
      className={`${style.Button} ${style[priority]}`}
      {...buttonProps}
      disabled={isLoading}
      onClick={handleOnClick}
    >
      {isLoading ? loadingText?.toUpperCase() : label?.toUpperCase()}
    </button>
  );
};

export default Button;
