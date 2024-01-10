import { forwardRef, useEffect, useRef, useImperativeHandle } from "react";
import classNames from "classnames";
import styles from "./checkbox.module.scss";

export enum CheckboxSize {
  Small = "sm",
  Medium = "md",
}

type CheckboxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
> & {
  indeterminate?: boolean;
  size?: CheckboxSize;
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(
    {
      children,
      className,
      style,
      size = CheckboxSize.Medium,
      checked,
      indeterminate,
      ...otherProps
    },
    ref,
  ) {
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle<HTMLInputElement | null, HTMLInputElement | null>(
      ref,
      () => inputRef.current,
      [],
    );

    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = indeterminate ?? false;
      }
    }, [indeterminate]);

    return (
      <label
        className={classNames(styles.container, styles[size], className)}
        style={style}
      >
        <input
          {...otherProps}
          type="checkbox"
          checked={checked}
          ref={inputRef}
        />
        <span
          className={classNames(
            styles.checkbox,
            indeterminate && styles.indeterminate,
          )}
        >
          <svg
            className={styles.indeterminateCheck}
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.5 6H9.5"
              stroke="#7F56D9"
              strokeWidth="1.66666"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <svg
            className={styles.check}
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 3L4.5 8.5L2 6"
              stroke="currentColor"
              strokeWidth="1.6666"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span>{children}</span>
      </label>
    );
  },
);

// import React from "react";
// import classNames from "classnames";
// import styles from "./checkbox.module.scss";

// export enum CheckboxState {
//   Unchecked = "unchecked",
//   Checked = "checked",
//   PartlyChecked = "partlyChecked",
// }

// type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
//   sizeClass?: CheckboxSizeClass;
//   state?: CheckboxState;
// };

// // Disabled is a default HTML input prop, so passed in with ...props.

// export function Checkbox({
//   className,
//   sizeClass = CheckboxSizeClass.Medium,
//   state = CheckboxState.Unchecked,
//   ...props
// }: ButtonProps) {
//   return (
//     <input
//       type="checkbox"
//       className={classNames(
//         styles.checkbox,
//         styles[sizeClass],
//         styles[state],
//         className,
//       )}
//       {...props}
//     />
//   );
// }
