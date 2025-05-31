import { createElement } from "react";

import "./text.css";

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
  const textDecoration = decoration ? `${priority}-${decoration}` : "";

  if (textDecoration) {
    return createElement(
      "div",
      { className: ` ${textDecoration}` },
      createElement(
        type,
        {
          className: `Text-${type}-${priority} ${className}`,
        },
        text
      )
    );
  }

  return createElement(
    type,
    { className: `Text-${type}-${priority} ${className}` },
    text
  );
};

export default Text;
