// TimerScreen.tsx
import { useAtom } from "jotai";
import { tasksAtom, currentTaskIdAtom } from "./atoms";
import { View } from "react-native";
import Timer from "./Timer";

export default function TimerScreen() {
  const [tasks, setTasks] = useAtom(tasksAtom);
  const [currentTaskId, setCurrentTaskId] = useAtom(currentTaskIdAtom);
  const startedTask = tasks.find((task) => task.id === currentTaskId);

  function decreaseCurrentTaskPomodoros() {
    if (!currentTaskId) {
      console.log("No task is selected.");
      return;
    }

    setTasks((prevTasks) =>
      prevTasks.map((task, index) => {
        if (task.id === currentTaskId) {
          const updatedPomodoros = Math.max(task.pomodoros - 1, 0);
          const updatedTask = { ...task, pomodoros: updatedPomodoros };

          if (updatedPomodoros === 0) {
            updatedTask.completed = true;
            setCurrentTaskId(null);

            // Find the next task in the tasks array and start it
            if (tasks.length > 1) {
              // have to check or it's bugged
              const nextTaskIndex = (index + 1) % tasks.length;
              const nextTask = tasks[nextTaskIndex];
              setCurrentTaskId(nextTask.id as string | null);
            }
          }
          return updatedTask;
        }
        return task;
      })
    );
    if (startedTask) {
      console.log("pomodoros: " + startedTask.pomodoros);
    }
  }

  return (
    <View>
      <Timer pomodoroDecrease={decreaseCurrentTaskPomodoros} />
    </View>
  );
}
