/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useRef, useEffect } from "react";

import Tooltip from "@components/atoms/ToolTip";

import phoneNumberLocals from "@resources/phoneNumberLocals";

import WynnRegistrationsApp from "@app-types/WynnRegistrationsApp.types";

import TickSvg from "@public/tick.svg";
import SearchSvg from "@public/search.svg";

import style from "./phone-number-input.module.css";

export type PhoneNumberInputProps = {
  label?: string;
  onChange?: (
    number: { number: string } & WynnRegistrationsApp.PhoneNumberFieldData
  ) => void;
  onBlur?: (
    number: { number: string } & WynnRegistrationsApp.PhoneNumberFieldData
  ) => void;
  isValid?: string;
  tooltip?: string;
  testId?: string;
} & React.SelectHTMLAttributes<HTMLInputElement>;

const PhoneNumberInput = (props: PhoneNumberInputProps) => {
  const {
    id,
    label,
    required,
    onChange,
    onBlur,
    isValid = "",
    value,
    tooltip,
    testId,
  } = props;

  const [selectCountry, setSelectCountry] = useState(phoneNumberLocals[0]);
  const [searchLocal, setSearchLocal] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const number = e.target.value;
    const numRegex = /[^0-9]/g;
    if (numRegex.test(number)) return;
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
      <label className={style.Phone_number_field}>
        <label htmlFor={id} className={style.Phone_number_field_label}>
          {label} {required ? "*" : ""}
          {tooltip && (
            <div className={style.Phone_field_label_tooltip}>
              <Tooltip text={tooltip} />
            </div>
          )}
        </label>
        <div
          className={`${style.Phone_number_field_section} ${style[isValid]}`}
        >
          <button
            data-testid="flag"
            onClick={(e) => {
              e.preventDefault();
              setIsOpen((prev) => !prev);
            }}
            className={style.Phone_number_field_selected_flag}
          >
            <img
              src={selectCountry.flagImgSrc}
              alt="flag"
              className={style.Phone_number_flag}
            />
            <img
              src="/chevron_icon.svg"
              alt="chevron"
              className={style.Phone_number_field_chevron}
            />
          </button>
          <input
            id={`${id}-region-code`}
            type="tel"
            className={style.Phone_number_field_region_code}
            readOnly
            placeholder={selectCountry.countryCode}
            value={value ? selectCountry.countryCode : ""}
          />

          <input
            id={id}
            type="tel"
            inputMode="numeric"
            data-testid={testId}
            pattern="[0-9]*"
            maxLength={10}
            className={style.Phone_number_field_input}
            value={value}
            onClick={() => setIsOpen(false)}
            onBlur={handleOnBlur}
            onChange={handleOnChange}
            placeholder="(____)-______"
          />
        </div>
        <div className={`${isOpen ? style.Phone_country_search : "hide"}`}>
          <div className={style.Phone_number_field_list_search_container}>
            <SearchSvg className={style.Phone_number_field_list_search_icon} />
            <input
              className={style.Phone_number_field_list_search}
              placeholder="Search"
              onChange={(e) => setSearchLocal(e.target.value)}
            />
          </div>
          <div className={style.Phone_number_field_list}>
            {filterLocalsList?.map((country) => {
              const selected = country.code === selectCountry.code;
              return (
                <div
                  onClick={() => {
                    setSelectCountry(country);
                    setIsOpen(false);
                  }}
                  className={`${style.Phone_number_field_container} ${
                    selected ? style.selected_option : ""
                  }`}
                  key={country.label}
                >
                  <img
                    src={country.flagImgSrc}
                    alt="flag"
                    className={style.Phone_number_flag}
                  />
                  <input
                    className={style.Phone_number_field_item}
                    id={selectCountry.code}
                    type="button"
                    data-testid={country.label}
                    value={country.label}
                    onClick={() => {
                      setSelectCountry(country);
                      setIsOpen(false);
                    }}
                  />
                  {selected && (
                    <TickSvg className={style.Phone_number_field_tick} />
                  )}
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
