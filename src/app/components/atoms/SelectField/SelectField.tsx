/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useRef, useEffect } from "react";

import style from "./select-field.module.css";

export type SelectFieldProps = {
  label?: string;
  placeholder?: string;
  isValid?: string;
  options?: { value: string; label: string }[];
} & React.SelectHTMLAttributes<HTMLInputElement>;

const SelectField = (props: SelectFieldProps) => {
  const {
    id,
    label,
    required,
    placeholder,
    options,
    onChange,
    onBlur,
    isValid = "",
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState<{
    label: string;
    value: string;
  }>({ label: "", value: "" });
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleOnChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.MouseEvent<HTMLInputElement, MouseEvent>
      | React.FocusEvent<HTMLInputElement>
  ) => {
    if (onChange) {
      onChange(e as React.ChangeEvent<HTMLInputElement>);
    }

    if (onBlur) {
      onBlur(e as React.FocusEvent<HTMLInputElement>);
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
        className={style.Select_field}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <label htmlFor={id} className={style.Select_field_label}>
          {label} {required ? "*" : ""}
        </label>
        <input
          type="text"
          className={`${style.Select_field_internal} ${style[isValid]}`}
          placeholder={placeholder}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setIsOpen((prev) => !prev);
            }
          }}
          onBlur={onBlur}
          onChange={(e) => console.log({ e })}
          value={value.label}
          readOnly
          id={id}
          {...{ props, options: "" }}
        />
        <img src="/chevron_icon.svg" alt="chevron" className={style.chevron} />
        <div
          onClick={() => setIsOpen(true)}
          className={`${isOpen ? style.Select_field_list : "hide"}`}
        >
          {options?.map((option) => {
            return (
              <input
                className={`${style.Select_field_list_item} ${
                  value.label === option.label ? style.selected_option : ""
                }`}
                id={option.value as string}
                onClick={(e) => {
                  setValue(() => option);
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
