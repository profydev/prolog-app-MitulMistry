import React from "react";
import classNames from "classnames";
import styles from "./checkbox.module.scss";

export enum CheckboxSizeClass {
  Small = "sm",
  Medium = "md",
}

export enum CheckboxState {
  Unchecked = "unchecked",
  Checked = "checked",
  PartlyChecked = "partlyChecked",
}

type ButtonProps = React.InputHTMLAttributes<HTMLInputElement> & {
  sizeClass?: CheckboxSizeClass;
  state?: CheckboxState;
};

// Disabled is a default HTML input prop, so passed in with ...props.

export function Checkbox({
  className,
  sizeClass = CheckboxSizeClass.Medium,
  state = CheckboxState.Unchecked,
  ...props
}: ButtonProps) {
  return (
    <input
      type="checkbox"
      className={classNames(
        styles.checkbox,
        styles[sizeClass],
        styles[state],
        className,
      )}
      {...props}
    />
  );
}
