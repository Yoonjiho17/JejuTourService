import type { SafetyFacilities } from "./entity";

const API_KEY = import.meta.env.VITE_API_KEY_ENCODING;

export async function getSafetyFacilities(
  page: number,
  perPage: number
): Promise<{ data: SafetyFacilities[]; totalCount: number }> {
  const url = `https://api.odcloud.kr/api/15109371/v1/uddi:4538cdb4-6466-408a-ae63-bd2eec869c7b?page=${page}&perPage=${perPage}&serviceKey=${API_KEY}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("안전시설 데이터를 불러오지 못했습니다.");
  }

  const json = await response.json();
  return {
    data: json.data,
    totalCount: json.totalCount,
  };
}

export default getSafetyFacilities;
