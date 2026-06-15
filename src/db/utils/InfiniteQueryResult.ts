export type InfiniteQueryResult<T> = {
  currentPage: number;
  results: T[];
  hasNextPage: boolean;
};
