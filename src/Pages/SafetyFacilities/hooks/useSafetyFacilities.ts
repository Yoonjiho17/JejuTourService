import { useQuery } from "@tanstack/react-query";
import type { SafetyFacilities } from "../api/entity.ts";
import getSafetyFacilities from "../api/getSafetyFacilities.ts";
import { keepPreviousData } from "@tanstack/react-query";

export const useSafetyFacilities = (page: number, perPage: number) => {
  return useQuery<{ data: SafetyFacilities[]; totalCount: number }>({
    queryKey: ["SafetyFacilities", page],
    queryFn: () => getSafetyFacilities(page, perPage),
    placeholderData: keepPreviousData,
  });
};
