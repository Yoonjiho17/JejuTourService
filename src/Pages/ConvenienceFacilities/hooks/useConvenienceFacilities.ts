import { useQuery } from "@tanstack/react-query";
import type { ConvenienceFacilities } from "../api/entity.ts";
import getConvenienceFacilities from "../api/getConvenienceFacilities.ts";
import { keepPreviousData } from "@tanstack/react-query";

export const useConvenienceFacilities = (page: number, perPage: number) => {
  return useQuery<{ data: ConvenienceFacilities[]; totalCount: number }>({
    queryKey: ["ConvenienceFacilities", page],
    queryFn: () => getConvenienceFacilities(page, perPage),
    placeholderData: keepPreviousData,
  });
};
