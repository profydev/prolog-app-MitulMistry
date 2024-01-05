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

export enum ButtonColor {
  Primary = "primary",
  Secondary = "secondary",
  Gray = "gray",
  Error = "error",
}

export enum ButtonVariant {
  Default = "default",
  Empty = "empty",
  IconOnly = "iconOnly",
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: ButtonSize;
  color?: ButtonColor;
  variant?: ButtonVariant;
};

// Disabled is a default HTML button prop, so passed in with ...props.

export function Button({
  className,
  size = ButtonSize.Medium,
  color = ButtonColor.Primary,
  variant = ButtonVariant.Default,
  ...props
}: ButtonProps) {
  return (
    <UnstyledButton
      className={classNames(
        styles.button,
        styles[size],
        styles[color],
        styles[variant],
        className,
      )}
      {...props}
    />
  );
}
