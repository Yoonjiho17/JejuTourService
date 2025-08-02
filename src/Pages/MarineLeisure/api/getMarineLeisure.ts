import type { MarineLeisure } from "./entity";

const API_KEY = import.meta.env.VITE_API_KEY_ENCODING;

export async function getMarineLeisure(): Promise<MarineLeisure[]> {
  const url = `https://api.odcloud.kr/api/15109354/v1/uddi:689e1f76-f179-49f7-b858-9c3fc94b5129?page=1&perPage=80&serviceKey=${API_KEY}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("해양레저스포츠 데이터를 불러오지 못했습니다.");
  }

  const data = await response.json();
  return data.data;
}

export default getMarineLeisure;
