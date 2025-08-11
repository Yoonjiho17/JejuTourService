import { useQuery } from "@tanstack/react-query";
import type { AccommodationType } from "../api/entity.ts";
import getAccommodation from "../api/getAccommodation.ts";
import { keepPreviousData } from "@tanstack/react-query";

export const useAccommodation = (page: number, perPage: number) => {
  return useQuery<{ data: AccommodationType[]; totalCount: number }>({
    queryKey: ["Accommodation", page],
    queryFn: () => getAccommodation(page, perPage),
    placeholderData: keepPreviousData,
  });
};
