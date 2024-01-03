import React from "react";
import styles from "./alert.module.scss";

type AlertMessageProps = {
  children: React.ReactNode;
};

export function AlertMessage({ children }: AlertMessageProps) {
  return <span className={styles.message}>{children}</span>;
}
