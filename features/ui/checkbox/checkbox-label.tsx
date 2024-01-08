import React from "react";
import classNames from "classnames";
import styles from "./checkbox.module.scss";

type checkboxLabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  text?: string;
};

export function CheckboxLabel({
  className,
  text = "",
  ...props
}: checkboxLabelProps) {
  return (
    <label className={classNames(className, styles.label)} {...props}>
      {text}
    </label>
  );
}
