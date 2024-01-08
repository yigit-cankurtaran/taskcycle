import TimerView from "./TimerView";
import TaskLogic from "./TaskLogic";
import "./index.css";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Task {
  id: string;
  title: string;
  pomodoros: number;
  completed: boolean;
}

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentTaskId, setCurrentTaskId] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      const storedTasks = await AsyncStorage.getItem("tasks");
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    };

    const fetchCurrentTaskId = async () => {
      const storedCurrentTaskId = await AsyncStorage.getItem("currentTaskId");
      if (storedCurrentTaskId) {
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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "16px",
        textAlign: "center",
        minHeight: "100vh",
        minWidth: "100vw",
        margin: "auto",
      }}
    >
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
      />
    </div>
  );
}
