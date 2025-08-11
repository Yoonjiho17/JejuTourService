import { useQuery } from "@tanstack/react-query";
import type { SafetyFacilitiesType } from "../api/entity.ts";
import getSafetyFacilities from "../api/getSafetyFacilities.ts";
import { keepPreviousData } from "@tanstack/react-query";

export const useSafetyFacilities = (page: number, perPage: number) => {
  return useQuery<{ data: SafetyFacilitiesType[]; totalCount: number }>({
    queryKey: ["SafetyFacilities", page],
    queryFn: () => getSafetyFacilities(page, perPage),
    placeholderData: keepPreviousData,
  });
};
