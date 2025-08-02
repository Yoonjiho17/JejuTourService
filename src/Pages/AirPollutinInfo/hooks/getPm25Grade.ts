function getPm25Grade(grade: string | undefined) {
  switch (grade) {
    case "1":
      return "좋음 😊";
    case "2":
      return "보통 🙂";
    case "3":
      return "나쁨 😷";
    case "4":
      return "매우 나쁨 😱";
    default:
      return "정보 없음";
  }
}

export default getPm25Grade;
