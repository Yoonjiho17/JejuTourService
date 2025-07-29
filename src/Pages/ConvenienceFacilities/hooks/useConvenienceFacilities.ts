import { useQuery } from "@tanstack/react-query";
import type { ConvenienceFacilities } from "../api/entity.ts";
import getConvenienceFacilities from "../api/getConvenienceFacilities.ts";

export const useConvenienceFacilities = () => {
  return useQuery<ConvenienceFacilities[]>({
    queryKey: ["ConvenienceFacilities"],
    queryFn: getConvenienceFacilities,
  });
};
