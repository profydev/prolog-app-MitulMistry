import React from "react";
// import styles from "./alert.module.scss";
import { Button, ButtonColor, ButtonSize, ButtonVariant } from "../button";

type AlertButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
};

export function AlertButton({ children, onClick }: AlertButtonProps) {
  return (
    <Button
      type="button"
      size={ButtonSize.Small}
      variant={ButtonVariant.Empty}
      color={ButtonColor.Error}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
