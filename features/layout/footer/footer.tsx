import Link from "next/link";
import React from "react";
import styles from "./footer.module.scss";
import config from "package.json";

export function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.version}>Version {config.version}</div>
      <ul className={styles.links}>
        <li>
          <Link href="#">Docs</Link>
        </li>
        <li>
          <Link href="#">API</Link>
        </li>
        <li>
          <Link href="#">Help</Link>
        </li>
        <li>
          <Link href="#">Community</Link>
        </li>
      </ul>
      <div className={styles.logo}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icons/logo-small.svg" alt="Prolog logo" />
      </div>
    </div>
  );
}
