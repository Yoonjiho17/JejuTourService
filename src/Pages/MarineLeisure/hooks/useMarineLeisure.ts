import { useQuery } from "@tanstack/react-query";
import type { MarineLeisure } from "../api/entity.ts";
import getMarineLeisure from "../api/getMarineLeisure.ts";
import { keepPreviousData } from "@tanstack/react-query";

export const useMarineLeisure = (page: number, perPage: number) => {
  return useQuery<{ data: MarineLeisure[]; totalCount: number }>({
    queryKey: ["MarineLeisure", page],
    queryFn: () => getMarineLeisure(page, perPage),
    placeholderData: keepPreviousData,
  });
};
