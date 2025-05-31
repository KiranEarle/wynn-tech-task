/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useRef, useEffect } from "react";

import "./select-field.css";

export type SelectFieldProps = {
  label?: string;
  placeholder?: string;
  options?: { value: string; label: string }[];
  onChange?: (e: React.MouseEvent<HTMLInputElement>) => void;
} & React.SelectHTMLAttributes<HTMLInputElement>;

const SelectField = (props: SelectFieldProps) => {
  const { id, label, required, placeholder, options, onChange } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState<{
    label: string;
    value: string;
  }>({ label: "", value: "" });
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleOnChange = (e: React.MouseEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef}>
      <label
        htmlFor={id}
        className="Select-field"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <label htmlFor={id} className="Select-field-label">
          {label} {required ? "*" : ""}
        </label>
        <input
          className="Select-field-internal"
          placeholder={placeholder}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setIsOpen((prev) => !prev);
            }
          }}
          value={value.label}
          readOnly
          id={id}
          {...{ props, options: "" }}
        />
        <img src="/chevron_icon.svg" alt="chevron" className="chevron" />
        <div
          onClick={() => setIsOpen(true)}
          className={`${isOpen ? "Select-field-list" : "hide"}`}
        >
          {options?.map((option) => {
            return (
              <input
                className={`Select-field-list-item ${
                  value.label === option.label ? "selected-option" : ""
                }`}
                id={option.value as string}
                onClick={(e) => {
                  setValue(option);
                  handleOnChange(e);
                }}
                key={option.label}
                type="button"
                value={option.label}
              />
            );
          })}
        </div>
      </label>
    </div>
  );
};

export default SelectField;
