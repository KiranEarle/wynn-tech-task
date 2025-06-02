import style from "./input-field.module.css";

export type InputProps = {
  label?: string;
  isValid?: string;
  setValidation?: (value: string) => void;
  validationText?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = (props: InputProps) => {
  const {
    id,
    label,
    required,
    value,
    onChange,
    isValid = "",
    ...inputProps
  } = props;
  return (
    <label htmlFor={id} className={style.Input_field}>
      <label htmlFor={id} className={style.Input_field_label}>
        {label} {required ? "*" : ""}
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
