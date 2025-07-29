import { useQuery } from "@tanstack/react-query";
import type { ExcellentRestaurants } from '../api/entity.ts';
import getExcellentRestaurants from "../api/getExcellentRestaurants.ts";

export const useExcellentRestaurants = () => { 
    return useQuery<ExcellentRestaurants[]>({
    queryKey: ['ExcellentRestaurants'],
    queryFn: getExcellentRestaurants,
  });
};

