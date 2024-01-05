import { ButtonHTMLAttributes } from "react";
import classNames from "classnames";
import styles from "./unstyled-button.module.scss";

export function UnstyledButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...props} className={classNames(styles.button, props.className)} />
  );
}
