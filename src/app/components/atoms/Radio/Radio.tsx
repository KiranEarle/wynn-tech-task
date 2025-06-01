import style from "./radio.module.css";

export type RadioProps = {
  label?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Radio = (props: RadioProps) => {
  const { label, value, checked, onChange, name, ...radioProps } = props;

  return (
    <label className={style.Radio}>
      <input
        type="radio"
        value={value}
        checked={checked}
        onChange={onChange}
        name={name}
        {...radioProps}
      />
      <span className={style.Radio_mark} />
      <span className={style.Radio_label}>{label}</span>
    </label>
  );
};

export default Radio;
