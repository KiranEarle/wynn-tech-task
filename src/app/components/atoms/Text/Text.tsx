import { createElement } from "react";

import style from "./text.module.css";

export type TextProp = {
  type?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  text?: string;
  priority?: "heading" | "normal";
  className?: string;
  decoration?: "" | "underline" | "bold";
};

const Text = ({
  type = "p",
  text = "",
  priority = "normal",
  className = "",
  decoration = "",
}: TextProp) => {
  const textDecoration = decoration
    ? `${style[`${priority}_${decoration}`]}`
    : "";

  if (textDecoration) {
    return createElement(
      "div",
      { className: ` ${textDecoration} ${className}` },
      createElement(
        type,
        {
          className: `${style[`Text_${type}_${priority}`]}`,
        },
        text
      )
    );
  }

  return createElement(
    type,
    { className: `${style[`Text_${type}_${priority}`]} ${className}` },
    text
  );
};

export default Text;
