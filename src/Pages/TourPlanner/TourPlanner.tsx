import { useState } from "react";
import styles from "./TourPlanner.module.css";
import Header from "../Header/Header";

interface PlanItem {
  time: string;
  content: string;
}

function TourPlanner() {
  const [days, setDays] = useState<PlanItem[][]>([[]]); // 1일차부터 시작
  const [selectedDay, setSelectedDay] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [newTime, setNewTime] = useState("");
  const [newContent, setNewContent] = useState("");

  const openModal = (dayIndex: number) => {
    setSelectedDay(dayIndex);
    setShowModal(true);
    setNewTime("");
    setNewContent("");
  };

  const addPlan = () => {
    if (!newTime || !newContent) return alert("시간과 내용을 모두 입력하세요.");
    const updatedDays = [...days];
    updatedDays[selectedDay].push({ time: newTime, content: newContent });
    setDays(updatedDays);
    setShowModal(false);
  };

  const deletePlan = (dayIndex: number, planIndex: number) => {
    const updated = [...days];
    updated[dayIndex].splice(planIndex, 1);
    setDays(updated);
  };

  const addNewDay = () => {
    setDays([...days, []]);
  };

  const deleteDay = (index: number) => {
    if (days.length === 1) {
      alert("최소 하루 이상의 일정은 필요합니다.");
      return;
    }

    const updated = [...days];
    updated.splice(index, 1);
    setDays(updated);
  };

  return (
    <div>
      <Header />
      <div className={styles.content}>
        <h2 className={styles.title}>여행 일정 계획</h2>
        <button className={styles.addDayButton} onClick={addNewDay}>
          + 날짜 추가
        </button>

        {days.map((dayPlans, dayIndex) => (
          <div key={dayIndex} className={styles.dayBox}>
            <div className={styles.dayHeader}>
              <h3>{dayIndex + 1}일차</h3>
              <button
                className={styles.deleteDayButton}
                onClick={() => deleteDay(dayIndex)}
              >
                삭제
              </button>
            </div>

            <button
              onClick={() => openModal(dayIndex)}
              className={styles.addButton}
            >
              + 일정 추가
            </button>

            <ul className={styles.planList}>
              {dayPlans.map((plan, planIndex) => (
                <li key={planIndex} className={styles.planItem}>
                  <span>
                    {plan.time} - {plan.content}
                  </span>
                  <button
                    className={styles.deleteButton}
                    onClick={() => deletePlan(dayIndex, planIndex)}
                  >
                    삭제
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {showModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <h3>일정 추가</h3>
              <label>
                시간:
                <input
                  type="time"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className={styles.input}
                />
              </label>
              <label>
                내용:
                <input
                  type="text"
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className={styles.input}
                />
              </label>
              <div className={styles.modalButtons}>
                <button className={styles.confirmButton} onClick={addPlan}>
                  확인
                </button>
                <button
                  className={styles.cancelButton}
                  onClick={() => setShowModal(false)}
                >
                  취소
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TourPlanner;
