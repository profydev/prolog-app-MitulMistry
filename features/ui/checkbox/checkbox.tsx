import classNames from "classnames";
import styles from "./checkbox.module.scss";

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Checkbox({
  children,
  className,
  style,
  checked,
  ...otherProps
}: CheckboxProps) {
  return (
    <label className={classNames(styles.container, className)} style={style}>
      <input {...otherProps} type="checkbox" checked={checked} />
      <span className={styles.checkbox}>
        <svg
          className={styles.check}
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 3L4.5 8.5L2 6"
            stroke="currentColor"
            stroke-width="1.6666"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
      {children}
    </label>
  );
}

// import React from "react";
// import classNames from "classnames";
// import styles from "./checkbox.module.scss";

// export enum CheckboxSizeClass {
//   Small = "sm",
//   Medium = "md",
// }

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
