import styles from "./TourPlanner.module.css";
import { usePlan } from "../../component/PlanContext";

function TourPlanner() {
  const {
    days,
    selectedDay,
    showModal,
    newTime,
    newContent,
    setNewTime,
    setNewContent,
    openModal,
    closeModal,
    addPlan,
    addNewDay,
    deleteDay,
    deletePlan,
    setSelectedDay,
  } = usePlan();

  return (
    <div>
      <div className={styles.content}>
        <h2 className={styles.title}>여행 일정 계획</h2>
        <button className={styles.addDayButton} onClick={addNewDay}>
          + 날짜 추가
        </button>
        <button onClick={() => openModal()} className={styles.addButton}>
          + 일정 추가
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
                날짜:
                <select
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(Number(e.target.value))}
                  className={styles.input}
                >
                  {days.map((_, index) => (
                    <option key={index} value={index}>
                      {index + 1}일차
                    </option>
                  ))}
                </select>
              </label>
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
                <button className={styles.cancelButton} onClick={closeModal}>
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
