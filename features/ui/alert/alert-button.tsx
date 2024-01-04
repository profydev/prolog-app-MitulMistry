import React from "react";
import styles from "./alert.module.scss";
import { UnstyledButton } from "../button";

type AlertButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
};

export function AlertButton({ children, onClick }: AlertButtonProps) {
  return (
    <UnstyledButton className={styles.button} type="button" onClick={onClick}>
      {children}
    </UnstyledButton>
  );
}
