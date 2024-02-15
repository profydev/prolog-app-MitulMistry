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
import styles from "./select.module.scss";
import classNames from "classnames";

const RESET_VALUE = "SELECT_RESET_OPTION_VALUE" as const;

type SelectOption<OptionValue> = {
  label: string;
  value: OptionValue;
};

// React-Aria Select component is not native HTML Select element,
// so doesn't make sense to extend it.
type SelectProps<OptionValue> = {
  children?: React.ReactNode;
  options: SelectOption<OptionValue>[];
  resetOptionLabel?: string;
  disabled?: boolean;
  selectedValue?: OptionValue | null;
  placeholder?: string;
  icon?: React.ReactNode;
  hint?: string;
  errorMessage?: string;
  onChange?: (value?: OptionValue) => void;
  className?: string;
  style?: React.CSSProperties;
};

// Could use label as a separate prop, but here used with children prop
// to maintain consistency with other components.
export function Select<OptionValue extends Key>({
  className,
  children,
  disabled,
  options,
  resetOptionLabel,
  selectedValue,
  placeholder,
  icon,
  hint,
  errorMessage,
  onChange,
  ...props
}: SelectProps<OptionValue>) {
  const isValidOption = (value: Key): value is OptionValue => {
    return options.some((option) => option.value === value);
  };
  let handleChange;
  if (onChange) {
    handleChange = (value: Key) => {
      if (isValidOption(value)) {
        onChange(value);
      } else {
        onChange(undefined);
      }
    };
  }

  // Add reset option if resetOptionLabel is provided
  const internalOptions = [
    ...(resetOptionLabel
      ? [{ label: resetOptionLabel, value: RESET_VALUE }]
      : []),
    ...options,
  ];

  return (
    <AriaSelect
      {...props}
      className={classNames(styles.select, className)}
      selectedKey={selectedValue}
      onSelectionChange={handleChange}
    >
      {children && <Label className={styles.label}>{children}</Label>}
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
        <SelectValue className={styles.value}>
          {(value) =>
            value.selectedText === RESET_VALUE || value.isPlaceholder
              ? placeholder
              : value.selectedText
          }
        </SelectValue>
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
            strokeWidth="1.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
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
        <ListBox className={styles.optionList} items={internalOptions}>
          {(option) => (
            <ListBoxItem
              key={option.value}
              id={option.value}
              textValue={option.label}
              className={classNames(
                styles.option,
                styles.selected,
                option.value === RESET_VALUE && styles.resetOption,
              )}
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
                        strokeWidth="1.66667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
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
