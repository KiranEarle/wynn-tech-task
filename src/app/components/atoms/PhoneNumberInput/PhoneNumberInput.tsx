/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useRef, useEffect } from "react";

import phoneNumberLocals from "@resources/phoneNumberLocals";

import WynnRegistrationsApp from "@app-types/WynnRegistrationsApp.types";

import "./phone-number-input.css";

export type PhoneNumberInputProps = {
  label?: string;
  onChange?: (
    number: { number: string } & WynnRegistrationsApp.PhoneNumberFieldData
  ) => void;
} & React.SelectHTMLAttributes<HTMLInputElement>;

const PhoneNumberInput = (props: PhoneNumberInputProps) => {
  const { id, label, required, onChange } = props;

  const [selectCountry, setSelectCountry] = useState(phoneNumberLocals[0]);
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const number = e.target.value;
    setValue(number);
    if (onChange) {
      onChange({ number, ...selectCountry });
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
        className="Phone-number-field"
        // onClick={() => setIsOpen((prev) => !prev)}
      >
        <label htmlFor={id} className="Phone-number-field-label">
          {label} {required ? "*" : ""}
        </label>
        <div className="Phone-number-field-section">
          <div
            onClick={() => setIsOpen((prev) => !prev)}
            className="Phone-number-field-selected-flag"
          >
            <img
              src={selectCountry.flagImgSrc}
              alt="flag"
              className="Phone-number-flag"
            />
            <img
              src="/chevron_icon.svg"
              alt="chevron"
              className="Phone-number-field-chevron"
            />
          </div>
          <input
            id={`${id}-region-code`}
            type="tel"
            className="Phone-number-field-region-code"
            readOnly
            placeholder={selectCountry.countryCode}
            value={selectCountry.countryCode}
          />

          <input
            id={id}
            type="tel"
            className="Phone-number-field-input"
            value={value}
            onClick={() => setIsOpen(false)}
            onChange={handleOnChange}
          />
        </div>
        <div
          onClick={() => setIsOpen(true)}
          className={`${isOpen ? "Phone-number-field-list" : "hide"}`}
        >
          {phoneNumberLocals?.map((country) => {
            return (
              <div
                onClick={() => {
                  setSelectCountry(country);
                }}
                className={`Phone-number-field-container ${
                  country.code === selectCountry.code ? "selected-option" : ""
                }`}
                key={country.label}
              >
                <img
                  src={country.flagImgSrc}
                  alt="flag"
                  className="Phone-number-flag"
                />
                <input
                  className="Phone-number-field-item"
                  id={selectCountry.code}
                  type="button"
                  value={country.label}
                />
              </div>
            );
          })}
        </div>
      </label>
    </div>
  );
};

export default PhoneNumberInput;
