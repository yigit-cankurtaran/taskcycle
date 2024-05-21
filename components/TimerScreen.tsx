import { useAtom } from "jotai";
import { tasksAtom, currentTaskIdAtom, currentTaskAtom } from "./atoms";
import Timer from "./Timer";
import { Card, Text } from "react-native-paper";
import { View } from "react-native";
import { theme } from "./helpers/theme";
import { useEffect } from "react";

export default function TimerScreen() {
  const [tasks, setTasks] = useAtom(tasksAtom);
  const [currentTaskId, setCurrentTaskId] = useAtom(currentTaskIdAtom);
  const [currentTask, setCurrentTask] = useAtom(currentTaskAtom);

  useEffect(() => {
    const currentTaskExists = tasks.some((task) => task.id === currentTaskId);
    if (!currentTaskExists) {
      setCurrentTaskId(null);
      setCurrentTask(null);
    }
  }, [tasks, currentTaskId, setCurrentTaskId, setCurrentTask]);

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

            // Find the next uncompleted task in the tasks array and start it
            const nextTask = prevTasks.find(
              (t, i) => i > index && !t.completed
            );
            if (nextTask) {
              setCurrentTaskId(nextTask.id);
              setCurrentTask(nextTask);
            } else {
              setCurrentTask(null);
            }
          } else {
            setCurrentTask(updatedTask);
          }
          return updatedTask;
        }
        return task;
      })
    );
  }

  return (
    <View
      style={{
        flex: 1,
        height: "100%",
        minHeight: "100%",
        alignItems: "center",
        justifyContent: "center",
        padding: theme.spacing.md,
        backgroundColor: theme.colors.background,
      }}
    >
      <Timer pomodoroDecrease={decreaseCurrentTaskPomodoros} />
      {currentTask && (
        <Card key={currentTask.id}>
          <Text>Task: {currentTask.title}</Text>
          <Text>Pomodoros: {currentTask.pomodoros}</Text>
        </Card>
      )}
    </View>
  );
}
