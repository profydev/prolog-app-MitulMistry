import { forwardRef } from "react";
import classNames from "classnames";
import styles from "./input.module.scss";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  children: React.ReactNode;
  className?: string;
  hint?: string;
  errorMessage?: string;
  icon?: React.ReactNode;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { children, className, hint, errorMessage, icon, ...props },
  ref,
) {
  return (
    <div className={classNames(styles.input, className)}>
      <label className={styles.label}>
        {children}
        {icon && (
          <span className={styles.icon} aria-hidden>
            {icon}
          </span>
        )}
        <input
          {...props}
          className={classNames(
            styles.inputBox,
            icon && styles.iconOffset,
            errorMessage && styles.error,
          )}
          ref={ref}
        />
        {errorMessage && (
          <span className={styles.errorIcon} aria-hidden>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
            >
              <g clip-path="url(#clip0_17171_1729)">
                <path
                  d="M8.00016 5.45966V8.12632M8.00016 10.793H8.00683M14.6668 8.12632C14.6668 11.8082 11.6821 14.793 8.00016 14.793C4.31826 14.793 1.3335 11.8082 1.3335 8.12632C1.3335 4.44442 4.31826 1.45966 8.00016 1.45966C11.6821 1.45966 14.6668 4.44442 14.6668 8.12632Z"
                  stroke="#F04438"
                  strokeWidth="1.33333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_17171_1729">
                  <rect
                    width="16"
                    height="16"
                    fill="white"
                    transform="translate(0 0.126343)"
                  />
                </clipPath>
              </defs>
            </svg>
          </span>
        )}
      </label>
      {hint && !errorMessage && <span className={styles.hint}>{hint}</span>}
      {errorMessage && (
        <span className={styles.errorMessage}>{errorMessage}</span>
      )}
    </div>
  );
});
