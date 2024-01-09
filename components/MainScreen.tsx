import TimerView from "./TimerView";
import TaskLogic from "./TaskLogic";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, StyleSheet } from "react-native";

interface Task {
  id: string;
  title: string;
  pomodoros: number;
  completed: boolean;
}

export default function MainScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentTaskId, setCurrentTaskId] = useState<string | null>(null);
  const [tasksFetched, setTasksFetched] = useState(false);

  useEffect(() => {
    console.log("MainScreen rendered.");
    const fetchTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem("tasks");
        if (storedTasks !== null) {
          setTasks(JSON.parse(storedTasks));
          console.log("Tasks fetched.", tasks);
        }
        setTasksFetched(true);
      } catch (e) {
        console.log(e);
      }
    };
    // tasks are fetched here

    const fetchCurrentTaskId = async () => {
      const storedCurrentTaskId = await AsyncStorage.getItem("currentTaskId");
      if (storedCurrentTaskId !== null) {
        setCurrentTaskId(JSON.parse(storedCurrentTaskId));
      }
    };

    fetchTasks();
    fetchCurrentTaskId();
  }, []);
  const startedTask = tasks.find((task) => task.id === currentTaskId);
  // handling state here and passing it down to TimerView and TaskLogic
  // solved pretty much all of the issues I was having with the app
  // now i can avoid state issues and the pomodoros properly decrease

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
          // BUG: if there's only 1 task, it keeps it started at 0 pomodoros
          // gets fixed on refresh, might just re-fetch tasks on every decrease

          if (updatedPomodoros === 0) {
            updatedTask.completed = true;
            setCurrentTaskId(null);

            // Find the next task in the tasks array and start it
            const nextTaskIndex = (index + 1) % tasks.length;
            const nextTask = tasks[nextTaskIndex];
            setCurrentTaskId(nextTask.id as string | null);
          }
          return updatedTask;
        }
        return task;
      })
    );
    if (startedTask) {
      console.log("pomodoros: " + startedTask.pomodoros);
      // might be null, check later
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.centeredView}>
        <TimerView pomodoroDecrease={decreaseCurrentTaskPomodoros} />
        <TaskLogic
          tasks={tasks}
          setTasks={setTasks}
          setCurrentTaskId={
            setCurrentTaskId as React.Dispatch<
              React.SetStateAction<string | null>
            >
          }
          currentTaskId={currentTaskId}
          TasksFetched={tasksFetched}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    width: "100%",
    height: "100%",
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
  },
});
