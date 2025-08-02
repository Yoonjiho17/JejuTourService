import type { ExcellentRestaurants } from "./entity";

const API_KEY = import.meta.env.VITE_API_KEY_ENCODING;

export async function getExcellentRestaurants(): Promise<
  ExcellentRestaurants[]
> {
  const url = `https://api.odcloud.kr/api/15043694/v1/uddi:6a6f9385-5a27-44d4-83cc-ad91a5b338a0?page=1&perPage=429&serviceKey=${API_KEY}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("모범음식점 데이터를 불러오지 못했습니다.");
  }

  const data = await response.json();
  return data.data;
}

export default getExcellentRestaurants;
