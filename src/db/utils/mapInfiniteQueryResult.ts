import { InfiniteQueryResult } from "./InfiniteQueryResult";
import { InfiniteData } from "@tanstack/react-query";

export const mapInfiniteQueryResult = <T>(
  data: InfiniteData<InfiniteQueryResult<T>>,
): T[] => {
  let results: T[] = [];

  for (let page of data.pages) {
    results = [...results, ...page.results];
  }
  return results;
};
