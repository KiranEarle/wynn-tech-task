import React from "react";
import styles from "./tool-tip.module.css";

import IconSvg from "@public/info.svg";

const Tooltip = ({ text, position = "left" }) => {
  return (
    <div className={styles.Tooltip_Container}>
      <IconSvg className={styles.icon} />
      <div className={`${styles.Tooltip} ${styles[position]}`}>{text}</div>
    </div>
  );
};

export default Tooltip;
