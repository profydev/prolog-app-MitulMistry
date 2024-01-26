import React from "react";
import classNames from "classnames";
import styles from "./input.module.scss";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  children: React.ReactNode;
  className?: string;
  hint?: string;
  errorMessage?: string;
};

export function Input({
  children,
  className,
  hint,
  errorMessage,
  ...props
}: InputProps) {
  return (
    <div className={styles.input}>
      <label className={styles.label}>
        {children}
        <input className={classNames(styles.inputBox, className)} {...props} />
      </label>
      {hint && !errorMessage && <span className={styles.hint}>{hint}</span>}
    </div>
  );
}
