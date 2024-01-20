import React from "react";
import classNames from "classnames";
import styles from "./select.module.scss";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
};

export function Select({ className, label, ...props }: SelectProps) {
  // const selectElement = (
  //   <select className={classNames(className, styles.select)} {...props}>
  //     {props.children}
  //   </select>
  // );

  if (label)
    return (
      <div>
        <label className={styles.label}>
          {label}
          {/* {selectElement} */}
          <select className={classNames(className, styles.select)} {...props}>
            {props.children}
          </select>
        </label>
      </div>
    );

  // return { selectElement };
  return (
    <select className={classNames(className, styles.select)} {...props}>
      {props.children}
    </select>
  );
}
