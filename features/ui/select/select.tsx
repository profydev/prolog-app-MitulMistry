import React from "react";
import classNames from "classnames";
// import styles from "./select.module.scss";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
};

export function Select({ className, label, ...props }: SelectProps) {
  return (
    <div>
      {label && <label>{label}</label>}
      <select className={classNames(className)} {...props}>
        {props.children}
      </select>
    </div>
  );
}
