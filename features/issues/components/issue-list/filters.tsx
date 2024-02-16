import { Select, Input } from "@features/ui";
import { IssueStatus, IssueLevel } from "@api/issues.types";
import { useFilters } from "./use-filters";
import styles from "./filters.module.scss";

const statusOptions = [
  { label: "Open", value: IssueStatus.open },
  { label: "Resolved", value: IssueStatus.resolved },
];

const levelOptions = [
  { label: "Error", value: IssueLevel.error },
  { label: "Warning", value: IssueLevel.warning },
  { label: "Info", value: IssueLevel.info },
];

export function Filters() {
  const { filters, updateFilter } = useFilters();
  return (
    <div className={styles.filters}>
      <Select
        data-testid="status-filter"
        className={styles.selectFilter}
        options={statusOptions}
        placeholder="Status"
        resetOptionLabel="All"
        aria-label="Filter by status"
        selectedValue={filters.status ?? null}
        onChange={(status) => updateFilter({ status })}
      />
      <Select
        data-testid="level-filter"
        className={styles.selectFilter}
        options={levelOptions}
        placeholder="Level"
        resetOptionLabel="All"
        aria-label="Filter by level"
        selectedValue={filters.level ?? null}
        onChange={(level) => updateFilter({ level })}
      />
      <Input
        data-testid="project-filter"
        className={styles.projectFilter}
        aria-label="Filter by project"
        value={filters.project || ""}
        onChange={(e) => updateFilter({ project: e.target.value })}
      />
    </div>
  );
}
