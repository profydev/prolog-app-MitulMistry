import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getIssues } from "@api/issues";
import type { Page } from "@typings/page.types";
import type { Issue } from "@api/issues.types";

const QUERY_KEY = "issues";

export function getQueryKey(page?: number) {
  if (page === undefined) {
    return [QUERY_KEY];
  }
  return [QUERY_KEY, page];
}

export function useGetIssues(
  page: number,
  status?: string,
  level?: string,
  project?: string,
) {
  const query = useQuery<Page<Issue>, Error>(
    getQueryKey(page),
    ({ signal }) => getIssues(page, status, level, project, { signal }),
    { keepPreviousData: true },
  );

  // Prefetch the next page!
  const queryClient = useQueryClient();
  useEffect(() => {
    if (query.data?.meta.hasNextPage) {
      queryClient.prefetchQuery(getQueryKey(page + 1), ({ signal }) =>
        getIssues(page + 1, status, level, project, { signal }),
      );
    }
  }, [query.data, page, status, level, project, queryClient]);
  return query;
}
