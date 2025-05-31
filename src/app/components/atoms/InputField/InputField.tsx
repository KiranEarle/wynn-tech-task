import "./input-field.css";

export type InputProps = {
  label?: string;
  isValid?: boolean;
  setValidation?: (value: string) => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = (props: InputProps) => {
  const { id, label, required } = props;
  return (
    <label htmlFor={id} className="Input-field">
      <label htmlFor={id} className="Input-field-label">
        {label} {required ? "*" : ""}
      </label>
      <input className="Input-field-internal" id={id} {...props} />
    </label>
  );
};

export default Input;
