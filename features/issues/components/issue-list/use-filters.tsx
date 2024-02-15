import { IssueStatus, IssueLevel, IssueListParams } from "@api/issues.types";
import { useRouter } from "next/router";
import { NextRouter } from "next/router";
import { z } from "zod";

const QueryParamsSchema = z.object({
  page: z
    .string()
    .optional()
    .transform((str) => Number(str) || 1),
  status: z.nativeEnum(IssueStatus).optional(),
  level: z.nativeEnum(IssueLevel).optional(),
  project: z.string().optional(),
});

function parseQueryParams(query: NextRouter["query"]) {
  const parsed = QueryParamsSchema.safeParse(query);
  if (!parsed.success) {
    console.error(parsed.error);
    return { page: 1 }; // If anything goes wrong, use default object
  }
  return parsed.data;
}

function removeEmptyValues(filters: Partial<IssueListParams>) {
  return Object.fromEntries(
    Object.entries(filters).filter(
      ([, value]) => Boolean(value) && value !== "",
    ),
  );
}

export function useFilters() {
  const router = useRouter();
  const queryParams = parseQueryParams(router.query);
  // console.log(queryParams);

  const updateFilter = (filters: Partial<IssueListParams>) => {
    const newQueryParams = removeEmptyValues({ ...queryParams, ...filters });
    router.push({
      pathname: router.pathname,
      query: newQueryParams,
    });
  };

  return { filters: queryParams, updateFilter };
}
