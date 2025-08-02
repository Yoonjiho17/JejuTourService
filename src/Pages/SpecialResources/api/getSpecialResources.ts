import type { SpecialResources } from "./entity";

const API_KEY = import.meta.env.VITE_API_KEY_ENCODING;

export async function getSpecialResources(): Promise<SpecialResources[]> {
  const url = `https://api.odcloud.kr/api/15109343/v1/uddi:9c1ddec7-b21e-40ea-afbe-ece4dfd0bc5a?page=1&perPage=598&serviceKey=${API_KEY}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("특화자원 데이터를 불러오지 못했습니다.");
  }

  const data = await response.json();
  return data.data;
}

export default getSpecialResources;
