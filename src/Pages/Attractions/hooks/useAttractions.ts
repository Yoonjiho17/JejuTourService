import { useQuery } from "@tanstack/react-query";
import type { Attractions } from "../api/entity";
import getAttractions from "../api/getAttractions";

export const useAttractions = () => {
  return useQuery<Attractions[]>({
    queryKey: ["Attractions"],
    queryFn: getAttractions,
  });
};
