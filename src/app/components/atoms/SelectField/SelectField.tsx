/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useRef, useEffect } from "react";

import style from "./select-field.module.css";

export type SelectFieldProps = {
  label?: string;
  placeholder?: string;
  isValid?: string;
  options?: string[];
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
    value,
  } = props;
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const ignoreBlur = useRef(false);

  const handleIgnoreBlur = () => {
    ignoreBlur.current = true;
  };

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

  const handleOnBlur = (e) => {
    if (ignoreBlur.current) {
      ignoreBlur.current = false;
      return;
    }
    if (onBlur) {
      onBlur(e as React.FocusEvent<HTMLInputElement, Element>);
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
          onBlur={handleOnBlur}
          value={value}
          readOnly
          id={id}
          {...{ props, options: "" }}
        />
        <img src="/chevron_icon.svg" alt="chevron" className={style.chevron} />
        <div
          onMouseDown={handleIgnoreBlur}
          onClick={() => {
            setIsOpen(true);
          }}
          className={`${isOpen ? style.Select_field_list : "hide"}`}
        >
          {options?.map((option) => {
            return (
              <input
                className={`${style.Select_field_list_item} ${
                  value === option ? style.selected_option : ""
                }`}
                id={option}
                onMouseDown={handleIgnoreBlur}
                onClick={(e) => {
                  handleOnChange(e);
                }}
                key={option}
                type="button"
                value={option}
              />
            );
          })}
        </div>
      </label>
    </div>
  );
};

export default SelectField;
