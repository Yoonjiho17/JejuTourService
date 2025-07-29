import { useQuery } from "@tanstack/react-query";
import type { SpecialResources } from '../api/entity.ts'
import getSpecialResources from "../api/getSpecialResources.ts";

export const useSpecialResources = () => { 
    return useQuery<SpecialResources[]>({
    queryKey: ['SpecialResources'],
    queryFn: getSpecialResources,
  });
};

