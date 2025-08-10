import type { SpecialResources } from "./entity";

const API_KEY = import.meta.env.VITE_API_KEY_ENCODING;

export async function getSpecialResources(
  page: number,
  perPage: number
): Promise<{ data: SpecialResources[]; totalCount: number }> {
  const url = `https://api.odcloud.kr/api/15109343/v1/uddi:9c1ddec7-b21e-40ea-afbe-ece4dfd0bc5a?page=${page}&perPage=${perPage}&serviceKey=${API_KEY}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("특화자원 데이터를 불러오지 못했습니다.");
  }

  const json = await response.json();
  return {
    data: json.data,
    totalCount: json.totalCount,
  };
}

export default getSpecialResources;
