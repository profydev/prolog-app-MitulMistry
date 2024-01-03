import React from "react";
import classNames from "classnames";
import styles from "./alert.module.scss";

export function Alert({
  className,
  ...otherProps
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      role="alert"
      className={classNames(styles.alert, className)}
      {...otherProps}
    />
  );
}
