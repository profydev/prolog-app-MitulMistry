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
    <div className={classNames(styles.input, className)}>
      <label className={styles.label}>
        {children}
        <input
          className={classNames(styles.inputBox, errorMessage && styles.error)}
          {...props}
        />
      </label>
      {hint && !errorMessage && <span className={styles.hint}>{hint}</span>}
      {errorMessage && (
        <span className={styles.errorMessage}>{errorMessage}</span>
      )}
    </div>
  );
}
