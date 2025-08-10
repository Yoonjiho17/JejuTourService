import { useQuery } from "@tanstack/react-query";
import type { ExcellentRestaurants } from "../api/entity.ts";
import getExcellentRestaurants from "../api/getExcellentRestaurants.ts";
import { keepPreviousData } from "@tanstack/react-query";

export const useExcellentRestaurants = (page: number, perPage: number) => {
  return useQuery<{ data: ExcellentRestaurants[]; totalCount: number }>({
    queryKey: ["ExcellentRestaurants", page],
    queryFn: () => getExcellentRestaurants(page, perPage),
    placeholderData: keepPreviousData,
  });
};
