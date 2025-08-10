import { useQuery } from "@tanstack/react-query";
import type { SpecialResources } from "../api/entity.ts";
import getSpecialResources from "../api/getSpecialResources.ts";
import { keepPreviousData } from "@tanstack/react-query";

export const useSpecialResources = (page: number, perPage: number) => {
  return useQuery<{ data: SpecialResources[]; totalCount: number }>({
    queryKey: ["SpecialResources", page],
    queryFn: () => getSpecialResources(page, perPage),
    placeholderData: keepPreviousData,
  });
};
