import styles from "./button.module.scss";

type ButtonIconProps = {
  src: string;
};

export function ButtonIcon({ src }: ButtonIconProps) {
  /* eslint-disable-next-line @next/next/no-img-element */
  return <img className={styles.icon} src={src} alt="" />;
}
