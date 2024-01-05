import {
  Alert,
  AlertButton,
  ButtonIcon,
  AlertMessage,
  LoadingIndicator,
} from "@features/ui";
import { ProjectCard } from "../project-card";
import { useGetProjects } from "../../api/use-get-projects";
import styles from "./project-list.module.scss";

export function ProjectList() {
  const { data, isLoading, isError, error, refetch } = useGetProjects();

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (isError) {
    console.error(error);
    return (
      <Alert data-testid="projects-error-message">
        <ButtonIcon src="/icons/alert-circle.svg" />
        <AlertMessage>
          There was a problem while loading the project data
        </AlertMessage>
        <AlertButton onClick={() => refetch()}>
          Try again
          <ButtonIcon src="/icons/arrow-right.svg" />
        </AlertButton>
      </Alert>
    );
  }

  return (
    <ul className={styles.list} data-testid="project-list">
      {data?.map((project) => (
        <li key={project.id}>
          <ProjectCard project={project} />
        </li>
      ))}
    </ul>
  );
}
