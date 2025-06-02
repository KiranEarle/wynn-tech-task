/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useRef, useEffect } from "react";

import phoneNumberLocals from "@resources/phoneNumberLocals";

import WynnRegistrationsApp from "@app-types/WynnRegistrationsApp.types";

import TickSvg from "@public/tick.svg";
import SearchSvg from "@public/search.svg";

import "./phone-number-input.css";

export type PhoneNumberInputProps = {
  label?: string;
  onChange?: (
    number: { number: string } & WynnRegistrationsApp.PhoneNumberFieldData
  ) => void;
  onBlur?: (
    number: { number: string } & WynnRegistrationsApp.PhoneNumberFieldData
  ) => void;
  isValid?: string;
} & React.SelectHTMLAttributes<HTMLInputElement>;

const PhoneNumberInput = (props: PhoneNumberInputProps) => {
  const { id, label, required, onChange, onBlur } = props;

  const [selectCountry, setSelectCountry] = useState(phoneNumberLocals[0]);
  const [searchLocal, setSearchLocal] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const number = e.target.value;
    const numRegex = /[^0-9]/g;
    if (numRegex.test(number)) return;
    setValue(number);
    if (onChange) {
      onChange({ number, ...selectCountry });
    }
  };

  const handleOnBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const number = e.target.value;
    if (onBlur) {
      onBlur({ number, ...selectCountry });
    }
  };

  const filterLocalsList = phoneNumberLocals.filter((local) => {
    return local.label.toLowerCase().includes(searchLocal.toLowerCase());
  });

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
      <label className="Phone-number-field">
        <label htmlFor={id} className="Phone-number-field-label">
          {label} {required ? "*" : ""}
        </label>
        <div className="Phone-number-field-section">
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsOpen((prev) => !prev);
            }}
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
          </button>
          <input
            id={`${id}-region-code`}
            type="tel"
            className="Phone-number-field-region-code"
            readOnly
            placeholder={selectCountry.countryCode}
            value={value ? selectCountry.countryCode : ""}
          />

          <input
            id={id}
            type="tel"
            inputMode="numeric"
            pattern="[0-9]*"
            className="Phone-number-field-input"
            value={value}
            onClick={() => setIsOpen(false)}
            onBlur={handleOnBlur}
            onChange={handleOnChange}
            placeholder="(____)-______"
          />
        </div>
        <div className={`${isOpen ? "Phone-country-search" : "hide"}`}>
          <div className="Phone-number-field-list-search-container">
            <SearchSvg className="Phone-number-field-list-search-icon" />
            <input
              className="Phone-number-field-list-search"
              placeholder="Search"
              onChange={(e) => setSearchLocal(e.target.value)}
            />
          </div>
          <div className="Phone-number-field-list">
            {filterLocalsList?.map((country) => {
              const selected = country.code === selectCountry.code;
              return (
                <div
                  onClick={() => {
                    setSelectCountry(country);
                    setIsOpen(false);
                  }}
                  className={`Phone-number-field-container ${
                    selected ? "selected-option" : ""
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
                    onClick={() => {
                      setSelectCountry(country);
                      setIsOpen(false);
                    }}
                  />
                  {selected && <TickSvg className="Phone-number-field-tick" />}
                </div>
              );
            })}
          </div>
        </div>
      </label>
    </div>
  );
};

export default PhoneNumberInput;
