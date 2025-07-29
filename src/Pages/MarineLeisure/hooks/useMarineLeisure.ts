import { useQuery } from "@tanstack/react-query";
import type { MarineLeisure } from "../api/entity.ts";
import getMarineLeisure from "../api/getMarineLeisure.ts";

export const useMarineLeisure = () => {
  return useQuery<MarineLeisure[]>({
    queryKey: ["MarineLeisure"],
    queryFn: getMarineLeisure,
  });
};
