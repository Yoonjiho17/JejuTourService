import type { ConvenienceFacilitiesType } from "./entity";

const API_KEY = import.meta.env.VITE_API_KEY_ENCODING;

export async function getConvenienceFacilities(
  page: number,
  perPage: number
): Promise<{ data: ConvenienceFacilitiesType[]; totalCount: number }> {
  const url = `https://api.odcloud.kr/api/15109369/v1/uddi:1b4bda91-aea6-4e8e-a1c9-92b8d27906cb?page=${page}&perPage=${perPage}&serviceKey=${API_KEY}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("편의시설 데이터를 불러오지 못했습니다.");
  }

  const json = await response.json();
  return {
    data: json.data,
    totalCount: json.totalCount,
  };
}

export default getConvenienceFacilities;
