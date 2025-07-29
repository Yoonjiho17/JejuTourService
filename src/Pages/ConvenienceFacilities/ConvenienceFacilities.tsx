import { useConvenienceFacilities } from "./hooks/useConvenienceFacilities"

function ConvenienceFacilities() {
    const{ data, isLoading, error } = useConvenienceFacilities();

    if (isLoading)
        return(
            <div>로딩 중...</div>
        )
    if (error)
        return(
            <div>에러: {error.message}</div>
        )

    return(
        <div>
            <h2>제주 안전시설 리스트</h2>
            <ul>
                {data?.map((item) => (
                    <li>
                        안전시설명: {item.편의시설명} [ 안전시설유형: {item.편의시설유형} ]
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ConvenienceFacilities

