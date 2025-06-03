import Tooltip from "@components/atoms/ToolTip";

import style from "./input-field.module.css";

export type InputProps = {
  label?: string;
  isValid?: string;
  setValidation?: (value: string) => void;
  validationText?: string;
  tooltip?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = (props: InputProps) => {
  const {
    id,
    label,
    required,
    value,
    onChange,
    isValid = "",
    tooltip,
    ...inputProps
  } = props;
  return (
    <label htmlFor={id} className={style.Input_field}>
      <label htmlFor={id} className={style.Input_field_label}>
        {label} {required ? "*" : ""}
        {tooltip && (
          <div className={style.Input_field_label_tooltip}>
            <Tooltip text={tooltip} />
          </div>
        )}
      </label>
      <input
        className={`${style.Input_field_internal}  ${style[isValid]}`}
        onChange={onChange}
        value={value}
        id={id}
        {...inputProps}
      />
    </label>
  );
};

export default Input;
