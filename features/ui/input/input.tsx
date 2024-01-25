import React from "react";
import classNames from "classnames";
import styles from "./input.module.scss";

type InputProps = {
  children: React.ReactNode;
  disabled: boolean;
  className: string;
};

export function Input({ children, disabled, className, ...props }: InputProps) {
  return (
    <label className={styles.label}>
      {children}
      <input
        className={classNames(styles.input, className)}
        disabled={disabled}
        {...props}
      />
    </label>
  );
}
