import { useAtom } from "jotai";
import { tasksAtom, currentTaskIdAtom, currentTaskAtom } from "./atoms";
import Timer from "./Timer";
import { Card, Text } from "react-native-paper";
import { View, StyleSheet } from "react-native";
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
      {/* i want to show the timer all the time instead of just when we start */}
      <Timer pomodoroDecrease={decreaseCurrentTaskPomodoros} />
      {currentTask && (
        <Card key={currentTask.id}>
          {/* this needs styling */}
          <View style={styles.taskContainer}>
            <Text style={styles.title}>Task</Text>
            <Text style={styles.text}>{currentTask.title}</Text>
            <Text style={styles.title}>Sessions</Text>
            <Text style={styles.text}>{currentTask.pomodoros}</Text>
          </View>
        </Card>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    height: "100%",
    minHeight: "100%",
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
    justifyContent: "center",
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background,
  },
  taskContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing.md,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    alignSelf: "center",
  },
  text: {
    textAlign: "center",
  },
});
