import type { ConvenienceFacilities } from "./entity";
import API_KEY from "../../../api/apiKey";

export async function getConvenienceFacilities(): Promise<ConvenienceFacilities[]> {
    const url = `https://api.odcloud.kr/api/15109369/v1/uddi:1b4bda91-aea6-4e8e-a1c9-92b8d27906cb?page=1&perPage=2451&serviceKey=${API_KEY}`

    const response = await fetch(url)
    if (!response.ok){
        throw new Error('편의시설 데이터를 불러오지 못했습니다.')
    }

    const data = await response.json()
    return data.data
}

export default getConvenienceFacilities

