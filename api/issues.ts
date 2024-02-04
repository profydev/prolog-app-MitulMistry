import { axios } from "./axios";
import type { Issue } from "./issues.types";
import { IssueStatus, IssueLevel } from "@api/issues.types";
import type { Page } from "@typings/page.types";

const ENDPOINT = "/issue";

export async function getIssues(
  page: number,
  statusStr?: string,
  levelStr?: string,
  project?: string,
  options?: { signal?: AbortSignal },
) {
  const level = levelStr && levelStr in IssueLevel ? levelStr : undefined;
  const status = statusStr && statusStr in IssueStatus ? statusStr : undefined;

  const { data } = await axios.get<Page<Issue>>(ENDPOINT, {
    params: { page, status, level, project },
    signal: options?.signal,
  });
  return data;
}
