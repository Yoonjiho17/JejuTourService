import { useQuery } from "@tanstack/react-query";
import type { Accommodation } from "../api/entity.ts";
import getAccommodation from "../api/getAccommodation.ts";
import { keepPreviousData } from "@tanstack/react-query";

export const useAccommodation = (page: number, perPage: number) => {
  return useQuery<{ data: Accommodation[]; totalCount: number }>({
    queryKey: ["Accommodation", page],
    queryFn: () => getAccommodation(page, perPage),
    placeholderData: keepPreviousData,
  });
};
