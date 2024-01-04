import React from "react";
import classNames from "classnames";
import styles from "./button.module.scss";
import { UnstyledButton } from "./unstyled-button";

export enum ButtonSize {
  Small = "sm",
  Medium = "md",
  Large = "lg",
  XLarge = "xl",
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: ButtonSize;
};

export function Button({
  className,
  size = ButtonSize.Medium,
  ...props
}: ButtonProps) {
  return (
    <UnstyledButton
      className={classNames(styles.button, styles[size], className)}
      {...props}
    />
  );
}
