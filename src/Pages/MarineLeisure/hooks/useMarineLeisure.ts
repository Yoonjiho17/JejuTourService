import { useQuery } from "@tanstack/react-query";
import type { MarineLeisureType } from "../api/entity.ts";
import getMarineLeisure from "../api/getMarineLeisure.ts";
import { keepPreviousData } from "@tanstack/react-query";

export const useMarineLeisure = (page: number, perPage: number) => {
  return useQuery<{ data: MarineLeisureType[]; totalCount: number }>({
    queryKey: ["MarineLeisure", page],
    queryFn: () => getMarineLeisure(page, perPage),
    placeholderData: keepPreviousData,
  });
};
