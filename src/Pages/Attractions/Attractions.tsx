import { useAttractions } from "./hooks/useAttractions"

function Attractions() {
    const{ data, isLoading, error } = useAttractions();

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
            <h2>제주도 관광지 리스트</h2>
            <ul>
                {data?.map((item) => (
                    <li>
                        숙박업소명: {item.관광지명}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Attractions

