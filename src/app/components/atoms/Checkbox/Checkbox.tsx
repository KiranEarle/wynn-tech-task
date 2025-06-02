import style from "./checkbox.module.css";

import TickSvg from "@public/tick.svg";

export type CheckboxProps = {
  label?: () => React.ReactNode;
  onClick?: (value: boolean) => void;
  isValid: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Checkbox = (props: CheckboxProps) => {
  const { id, onClick, checked } = props;
  const { label, isValid = "", ...inputProps } = props;
  const handleOnChange = (value: boolean) => {
    if (onClick) {
      onClick(value);
    }
  };
  return (
    <label className={`${style.Checkbox_container} ${style[isValid]}`}>
      <label
        htmlFor={id}
        className={`${style.Checkbox} ${checked ? style.checked : ""}`}
      >
        <input
          className={style.Checkbox_internal}
          onChange={() => handleOnChange(checked as boolean)}
          id={id}
          type="checkbox"
          {...inputProps}
        />
        <TickSvg />
      </label>
      {label && (
        <label onClick={() => handleOnChange(checked as boolean)} htmlFor={id}>
          {label()}
        </label>
      )}
    </label>
  );
};

export default Checkbox;
