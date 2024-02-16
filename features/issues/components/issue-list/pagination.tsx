import { useFilters } from "./use-filters";
import styles from "./pagination.module.scss";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
};

export function Pagination({ totalPages, currentPage }: PaginationProps) {
  const { filters, updateFilter } = useFilters();
  return (
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
          disabled={filters.page === totalPages}
        >
          Next
        </button>
      </div>
      <div className={styles.pageInfo}>
        Page <span className={styles.pageNumber}>{currentPage}</span> of{" "}
        <span className={styles.pageNumber}>{totalPages}</span>
      </div>
    </div>
  );
}
