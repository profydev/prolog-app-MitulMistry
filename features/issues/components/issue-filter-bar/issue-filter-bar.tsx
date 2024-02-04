import { ChangeEvent, useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "./issue-filter-bar.module.scss";
import { Input, Select } from "@features/ui";
import { Key } from "react-aria-components";
import classNames from "classnames";

export function IssueFilterBar() {
  const resolvedOptions = [
    { label: "All", value: "all" },
    { label: "Unresolved", value: "open" },
    { label: "Resolved", value: "resolved" },
  ];
  const levelOptions = [
    { label: "Any", value: "any" },
    { label: "Error", value: "error" },
    { label: "Warning", value: "warning" },
    { label: "Info", value: "info" },
  ];

  const [statusKey, setStatusKey] = useState("all");
  const [levelKey, setLevelKey] = useState("any");
  const [searchStr, setSearchStr] = useState("");

  const router = useRouter();

  // Modify URL parameters (for API query) on state change
  useEffect(() => {
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        page: 1,
        status: statusKey,
        level: levelKey,
        search: searchStr,
      },
    });
  }, [statusKey, levelKey, searchStr]);

  // Use Select as controlled components using selectedValue
  const statusOnChange = (key: Key) => setStatusKey(String(key));
  const levelOnChange = (key: Key) => setLevelKey(String(key));

  const searchStrOnChange = (event: ChangeEvent) => {
    const val = (event.target as HTMLInputElement).value;
    setSearchStr(val);
  };

  const searchIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M17.5 17.5L13.875 13.875M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z"
        stroke="#667085"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <div className={styles.filterBar}>
      <div className={styles.rightGroup}>
        <Select
          options={resolvedOptions}
          selectedValue={statusKey}
          onChange={statusOnChange}
          className={classNames(styles.input, styles.dropdown)}
        />
        <Select
          options={levelOptions}
          selectedValue={levelKey}
          onChange={levelOnChange}
          className={classNames(styles.input, styles.dropdown)}
        />
        <Input
          placeholder="Project Name"
          value={searchStr}
          onChange={searchStrOnChange}
          className={styles.input}
          icon={searchIcon}
        />
      </div>
    </div>
  );
}
