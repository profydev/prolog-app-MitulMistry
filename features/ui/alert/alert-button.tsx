import React from "react";
import styles from "./alert.module.scss";
import { Button } from "../button";

type AlertButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
};

export function AlertButton({ children, onClick }: AlertButtonProps) {
  return (
    <Button className={styles.button} type="button" onClick={onClick}>
      {children}
    </Button>
  );
}
