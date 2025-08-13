import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

interface PlanItem {
  time: string;
  content: string;
}

interface PlanContextType {
  days: PlanItem[][];
  selectedDay: number;
  showModal: boolean;
  newTime: string;
  newContent: string;
  openModal: (content?: string) => void;
  addPlan: () => void;
  setNewTime: (time: string) => void;
  setNewContent: (content: string) => void;
  deletePlan: (dayIndex: number, planIndex: number) => void;
  addNewDay: () => void;
  deleteDay: (index: number) => void;
  closeModal: () => void;
  setSelectedDay: (dayIndex: number) => void;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export function PlanProvider({ children }: { children: ReactNode }) {
  const [days, setDays] = useState<PlanItem[][]>(() => {
    const stored = localStorage.getItem("days");
    return stored ? JSON.parse(stored) : [[]];
  });
  const [selectedDay, setSelectedDay] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [newTime, setNewTime] = useState("");
  const [newContent, setNewContent] = useState("");

  const openModal = (content?: string, dayIndex?: number) => {
    setSelectedDay(dayIndex ?? 0);
    setShowModal(true);
    setNewTime("");
    setNewContent(content || "");
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const addPlan = () => {
    if (!newTime || !newContent) return alert("시간과 내용을 모두 입력하세요.");
    const newPlan = { time: newTime, content: newContent };
    const updatedDays = [...days];
    const insertIndex = updatedDays[selectedDay].findIndex(
      (plan) => newPlan.time <= plan.time
    );
    if (insertIndex === -1) {
      updatedDays[selectedDay].push(newPlan);
    } else {
      updatedDays[selectedDay].splice(insertIndex, 0, newPlan);
    }
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

  useEffect(() => {
    localStorage.setItem("days", JSON.stringify(days));
  }, [days]);

  return (
    <PlanContext.Provider
      value={{
        days,
        selectedDay,
        showModal,
        newTime,
        newContent,
        openModal,
        addPlan,
        setNewTime,
        setNewContent,
        deletePlan,
        addNewDay,
        deleteDay,
        closeModal,
        setSelectedDay,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);
  if (!context) throw new Error("usePlan must be used within a PlanProvider");
  return context;
}
