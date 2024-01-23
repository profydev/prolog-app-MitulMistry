import React from "react";
import {
  Button,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  Select as AriaSelect,
  SelectValue,
} from "react-aria-components";
import classNames from "classnames";
import styles from "./select.module.scss";

type SelectProps = {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  label?: string;
};

export function Select({
  children,
  disabled = false,
  className,
  label,
  ...props
}: SelectProps) {
  return (
    <AriaSelect
      className={classNames(className)}
      isDisabled={disabled}
      {...props}
    >
      {label && <Label className={styles.label}>{label}</Label>}
      <Button className={styles.select}>
        <SelectValue />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          className={styles.arrow}
        >
          <path
            d="M5 7.5L10 12.5L15 7.5"
            stroke="#667085"
            stroke-width="1.66667"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </Button>
      <Popover>
        <ListBox className={styles.listbox}>
          {children}
          <ListBoxItem className={styles.listboxItem}>Item 1</ListBoxItem>
          <ListBoxItem className={styles.listboxItem}>Item 2</ListBoxItem>
          <ListBoxItem className={styles.listboxItem}>Item 3</ListBoxItem>
        </ListBox>
      </Popover>
    </AriaSelect>
  );
}
