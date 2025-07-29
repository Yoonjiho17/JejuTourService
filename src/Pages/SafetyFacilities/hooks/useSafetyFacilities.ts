import { useQuery } from "@tanstack/react-query";
import type { SafetyFacilities } from '../api/entity.ts'
import getSafetyFacilities from "../api/getSafetyFacilities.ts";

export const useSafetyFacilities = () => { 
    return useQuery<SafetyFacilities[]>({
    queryKey: ['SafetyFacilities'],
    queryFn: getSafetyFacilities,
  });
};

