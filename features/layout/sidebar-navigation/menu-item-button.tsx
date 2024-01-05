import React from "react";
import { UnstyledButton } from "@features/ui";
import classNames from "classnames";
import styles from "./menu-item-link.module.scss";

type MenuItemProps = {
  className?: string;
  text: string;
  iconSrc: string;
  onClick: () => void;
  isCollapsed: boolean;
  flipOnCollapse?: boolean;
};

export function MenuItemButton({
  className,
  text,
  onClick,
  iconSrc,
  isCollapsed,
  flipOnCollapse,
}: MenuItemProps) {
  return (
    <li className={classNames(styles.listItem, className)}>
      <UnstyledButton className={styles.anchor} onClick={onClick}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={classNames(
            styles.icon,
            flipOnCollapse && isCollapsed && styles.isCollapsed,
          )}
          src={iconSrc}
          alt={`${text} icon`}
        />{" "}
        {!isCollapsed && text}{" "}
      </UnstyledButton>
    </li>
  );
}
