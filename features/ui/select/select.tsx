import React from "react";
import {
  Button,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  Select as AriaSelect,
  SelectValue,
  Text,
  Key,
} from "react-aria-components";
import classNames from "classnames";
import styles from "./select.module.scss";

type SelectOption = {
  label: string;
  value: Key;
};

// React-Aria Select component is not native HTML Select element,
// so doesn't make sense to extend it.
type SelectProps = {
  children: React.ReactNode;
  disabled: boolean;
  options: SelectOption[];
  selectedValue: Key;
  icon?: React.ReactNode;
  hint?: string;
  errorMessage?: string;
  onChange: (value: Key) => void;
  className?: string;
};

// Could use label as a separate prop, but here used with children prop
// to maintain consistency with other components.
export function Select({
  children,
  disabled,
  options,
  selectedValue,
  icon,
  hint,
  errorMessage,
  onChange,
  ...props
}: SelectProps) {
  return (
    <AriaSelect
      className={styles.select}
      selectedKey={selectedValue}
      onSelectionChange={onChange}
      {...props}
    >
      <Label className={styles.label}>{children}</Label>
      <Button
        className={classNames(styles.button, errorMessage && styles.error)}
        isDisabled={disabled}
      >
        {/* Use aria-hidden attribute to hide from screen readers, since only decorative purpose */}
        {icon && (
          <span className={styles.icon} aria-hidden>
            {icon}
          </span>
        )}
        <SelectValue className={styles.value} />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden
        >
          {/* Use stroke of currentColor to set color via CSS */}
          <path
            d="M5 7.5L10 12.5L15 7.5"
            stroke="currentColor"
            stroke-width="1.66667"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </Button>
      {hint && !errorMessage && (
        <Text className={styles.hint} slot="description">
          {hint}
        </Text>
      )}
      {errorMessage && (
        <div className={styles.errorMessage}>{errorMessage}</div>
      )}
      <Popover className={styles.popover}>
        <ListBox className={styles.optionList} items={options}>
          {(option) => (
            <ListBoxItem
              key={option.value}
              id={option.value}
              textValue={option.label}
              className={classNames(styles.option, styles.selected)}
            >
              {({ isSelected }) => (
                <>
                  {option.label}
                  {isSelected && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      aria-hidden
                    >
                      <path
                        d="M16.6668 5L7.50016 14.1667L3.3335 10"
                        stroke="currentColor"
                        stroke-width="1.66667"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  )}
                </>
              )}
            </ListBoxItem>
          )}
        </ListBox>
      </Popover>
    </AriaSelect>
  );
}
