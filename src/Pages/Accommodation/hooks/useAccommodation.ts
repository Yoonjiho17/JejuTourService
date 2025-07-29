import { useQuery } from "@tanstack/react-query";
import type { Accommodation } from '../api/entity.ts'
import getAccommodation from "../api/getAccommodation.ts";

export const useAccommodation = () => { 
    return useQuery<Accommodation[]>({
    queryKey: ['Accommodation'],
    queryFn: getAccommodation,
  });
};

