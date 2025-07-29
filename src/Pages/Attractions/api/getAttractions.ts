import type { Attractions } from "./entity";

const API_KEY = import.meta.env.VITE_API_KEY;

export async function getAttractions(): Promise<Attractions[]> {
  const url = `https://api.odcloud.kr/api/15109342/v1/uddi:c4e45e4c-cf0a-4886-8cb7-e3667d2df41d?page=1&perPage=381&serviceKey=${API_KEY}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("관광지 데이터를 불러오지 못했습니다.");
  }

  const data = await response.json();
  return data.data;
}

export default getAttractions;
