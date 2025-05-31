"use client";

import { useState } from "react";

import "./select-field.css";

export type SelectFieldProps = {
  label?: string;
  placeholder?: string;
  options?: { value: string | number; label: string | number }[];
} & React.SelectHTMLAttributes<HTMLInputElement>;

const SelectField = (props: SelectFieldProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState<{
    label: string | number;
    value: string | number;
  }>({ label: "", value: "" });

  const { id, label, required, placeholder, options, onChange } = props;
  const handleOnChange = (e) => {
    if (onChange) {
      onChange(e);
    }
  };
  return (
    <label
      htmlFor={id}
      className="Select-field"
      onClick={() => setIsOpen((prev) => !prev)}
      // onBlur={() => setIsOpen(false)}
    >
      <label htmlFor={id} className="Select-field-label">
        {label} {required ? "*" : ""}
      </label>
      <input
        className="Select-field-internal"
        placeholder={placeholder}
        onChange={handleOnChange}
        value={value.label}
        readOnly
        id={id}
        {...props}
      />
      <div
        onClick={() => setIsOpen(true)}
        className={`${isOpen ? "Select-field-list" : "hide"}`}
      >
        {options?.map((option) => {
          return (
            <div
              className="Select-field-list-item"
              onClick={() => setValue(option)}
              key={option.label}
            >
              {option.label}
            </div>
          );
        })}
      </div>
    </label>
  );
};

export default SelectField;
