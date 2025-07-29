import type { Accommodation } from "./entity";

const API_KEY = import.meta.env.VITE_API_KEY;

export async function getAccommodation(): Promise<Accommodation[]> {
  const url = `https://api.odcloud.kr/api/15109351/v1/uddi:1ce3ca75-753b-4e42-987f-833bb16687b1?page=1&perPage=2092&serviceKey=${API_KEY}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("숙박업소 데이터를 불러오지 못했습니다.");
  }

  const data = await response.json();
  return data.data;
}

export default getAccommodation;
