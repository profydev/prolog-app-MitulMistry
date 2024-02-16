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
} from "@features/ui";
import { Filters } from "./filters";
import { Pagination } from "./pagination";
import styles from "./issue-list.module.scss";

export function IssueList() {
  const { filters } = useFilters();
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
      <Filters />
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
        <Pagination
          currentPage={meta.currentPage ?? 1}
          totalPages={meta.totalPages ?? 1}
        ></Pagination>
      </div>
    </>
  );
}
