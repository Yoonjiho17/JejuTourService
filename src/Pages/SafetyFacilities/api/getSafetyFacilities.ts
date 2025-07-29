import type { SafetyFacilities } from "./entity";
import API_KEY from "../../../api/apiKey";

export async function getSafetyFacilities(): Promise<SafetyFacilities[]> {
    const url = `https://api.odcloud.kr/api/15109371/v1/uddi:4538cdb4-6466-408a-ae63-bd2eec869c7b?page=1&perPage=328&serviceKey=${API_KEY}`

    const response = await fetch(url)
    if (!response.ok){
        throw new Error('안전시설 데이터를 불러오지 못했습니다.')
    }

    const data = await response.json()
    return data.data
}

export default getSafetyFacilities

