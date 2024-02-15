import { useThrottle } from "@uidotdev/usehooks";
import { ProjectLanguage } from "@api/projects.types";
import { useGetProjects } from "@features/projects";
import { useGetIssues } from "../../api/use-get-issues";
import { useFilters } from "./use-filters";
import { IssueRow } from "./issue-row";
import {
  Alert,
  AlertButton,
  ButtonIcon,
  AlertMessage,
  LoadingIndicator,
  Select,
  Input,
} from "@features/ui";
import styles from "./issue-list.module.scss";
import { IssueStatus, IssueLevel } from "@api/issues.types";

const statusOptions = [
  { label: "Open", value: IssueStatus.open },
  { label: "Resolved", value: IssueStatus.resolved },
];

const levelOptions = [
  { label: "Error", value: IssueLevel.error },
  { label: "Warning", value: IssueLevel.warning },
  { label: "Info", value: IssueLevel.info },
];

export function IssueList() {
  const { filters, updateFilter } = useFilters();
  const throttledProjectFilter = useThrottle(filters.project, 500);
  const issuesPage = useGetIssues({
    ...filters,
    project: throttledProjectFilter,
  });
  const projects = useGetProjects();

  if (projects.isLoading || issuesPage.isLoading) {
    return <LoadingIndicator />;
  }

  if (projects.isError || issuesPage.isError) {
    console.error(projects.error);
    // return <div>Error loading projects: {projects.error.message}</div>;
    return (
      <Alert data-testid="issues-error-message">
        <ButtonIcon src="/icons/alert-circle.svg" />
        <AlertMessage>
          There was a problem while loading the issue data
        </AlertMessage>
        <AlertButton
          onClick={() => {
            issuesPage.refetch();
            projects.refetch();
          }}
        >
          Try again
          <ButtonIcon src="/icons/arrow-right.svg" />
        </AlertButton>
      </Alert>
    );
  }

  const projectIdToLanguage = (projects.data || []).reduce(
    (prev, project) => ({
      ...prev,
      [project.id]: project.language,
    }),
    {} as Record<string, ProjectLanguage>,
  );
  const { items, meta } = issuesPage.data || {};

  return (
    <>
      <div className={styles.filters}>
        <Select
          className={styles.selectFilter}
          options={statusOptions}
          placeholder="Status"
          resetOptionLabel="All"
          aria-label="Filter by status"
          selectedValue={filters.status ?? null}
          onChange={(status) => updateFilter({ status })}
        />
        <Select
          className={styles.selectFilter}
          options={levelOptions}
          placeholder="Level"
          resetOptionLabel="All"
          aria-label="Filter by level"
          selectedValue={filters.level ?? null}
          onChange={(level) => updateFilter({ level })}
        />
        <Input
          className={styles.projectFilter}
          aria-label="Filter by project"
          value={filters.project || ""}
          onChange={(e) => updateFilter({ project: e.target.value })}
        />
      </div>
      <div className={styles.container} data-testid="issue-list">
        <table className={styles.table}>
          <thead>
            <tr className={styles.headerRow}>
              <th className={styles.headerCell}>Issue</th>
              <th className={styles.headerCell}>Level</th>
              <th className={styles.headerCell}>Events</th>
              <th className={styles.headerCell}>Users</th>
            </tr>
          </thead>
          <tbody>
            {(items || []).map((issue) => (
              <IssueRow
                key={issue.id}
                issue={issue}
                projectLanguage={projectIdToLanguage[issue.projectId]}
              />
            ))}
          </tbody>
        </table>
        <div className={styles.paginationContainer}>
          <div>
            <button
              className={styles.paginationButton}
              onClick={() => updateFilter({ page: filters.page - 1 })}
              disabled={filters.page === 1}
            >
              Previous
            </button>
            <button
              className={styles.paginationButton}
              onClick={() => updateFilter({ page: filters.page + 1 })}
              disabled={filters.page === meta?.totalPages}
            >
              Next
            </button>
          </div>
          <div className={styles.pageInfo}>
            Page <span className={styles.pageNumber}>{meta?.currentPage}</span>{" "}
            of <span className={styles.pageNumber}>{meta?.totalPages}</span>
          </div>
        </div>
      </div>
    </>
  );
}
