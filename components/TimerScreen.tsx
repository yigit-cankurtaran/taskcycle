// TimerScreen.tsx
import { useAtom } from "jotai";
import { tasksAtom, currentTaskIdAtom, currentTaskAtom } from "./atoms";
import { View, Text } from "react-native";
import Timer from "./Timer";
import { useEffect } from "react";

export default function TimerScreen() {
  const [tasks, setTasks] = useAtom(tasksAtom);
  const [currentTaskId, setCurrentTaskId] = useAtom(currentTaskIdAtom);
  const [currentTask, setCurrentTask] = useAtom(currentTaskAtom);
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
            setCurrentTask(null);

            // Find the next uncompleted task in the tasks array and start it
            if (tasks.length > 1) {
              const nextTaskIndex = tasks.findIndex(
                (task, i) => i > index && !task.completed
                // checks if the task is uncompleted and comes after the current task
              );
              if (nextTaskIndex !== -1) {
                const nextTask = tasks[nextTaskIndex];
                // checks if there is a next task
                setCurrentTaskId(nextTask.id as string | null);
                setCurrentTask(nextTask);
              }
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
      {currentTask && (
        <View>
          <Text>Task: {currentTask.title}</Text>
          {/* pomodoros were bugged and i didn't wanna display them right now */}
          {/* might implement it in the future */}
        </View>
      )}
    </View>
  );
}
