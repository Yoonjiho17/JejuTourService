import { useAccommodation } from "./hooks/useAccommodation"

function Accommodation() {
    const{ data, isLoading, error } = useAccommodation();

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
            <h2>제주 숙박업소 리스트</h2>
            <ul>
                {data?.map((item) => (
                    <li>
                        숙박업소명: {item.숙박업소명}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Accommodation

