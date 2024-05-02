import { useAtom } from "jotai";
import { tasksAtom, currentTaskIdAtom, currentTaskAtom } from "./atoms";
import Timer from "./Timer";
import { Card, Text } from "react-native-paper";
import { View } from "react-native";
import { theme } from "./helpers/theme";

export default function TimerScreen() {
  const [tasks, setTasks] = useAtom(tasksAtom);
  const [currentTaskId, setCurrentTaskId] = useAtom(currentTaskIdAtom);
  const [currentTask, setCurrentTask] = useAtom(currentTaskAtom);
  const startedTask = currentTaskId
    ? tasks.find((task) => task.id === currentTaskId)
    : null;

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
              );
              if (nextTaskIndex !== -1) {
                const nextTask = tasks[nextTaskIndex];
                setCurrentTaskId(nextTask.id as string | null);
                setCurrentTask(nextTask);
              }
            }
          } else {
            // if the task is not completed, update the currentTaskId atom with the updated task
            setCurrentTask(updatedTask);
            // the update issue was because we were not updating the currentTask atom
            // so the TimerScreen component was not re-rendering
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
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Card mode="contained" style={{ alignItems: "center" }}>
        <Timer pomodoroDecrease={decreaseCurrentTaskPomodoros} />
        {currentTask && (
          <Card key={currentTask.pomodoros}>
            <Text>Task: {currentTask.title}</Text>
            <Text>Pomodoros: {currentTask.pomodoros}</Text>
          </Card>
        )}
      </Card>
    </View>
  );
}
