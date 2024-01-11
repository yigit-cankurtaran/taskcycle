import TimerView from "./TimerView";
import TaskLogic from "./TaskLogic";
import { useState, useEffect } from "react";
import storage from "./Storage";
import { View, StyleSheet } from "react-native";

interface Task {
  id: string;
  title: string;
  pomodoros: number;
  completed: boolean;
}

// TODO: implement a dark mode
// TODO: implement a switch to turn off the timer

export default function MainScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentTaskId, setCurrentTaskId] = useState<string | null>(null);
  const [tasksFetched, setTasksFetched] = useState(false);
  const [currentTaskIdFetched, setCurrentTaskIdFetched] = useState(false);

  useEffect(() => {
    const fetchTasks = () => {
      try {
        const storedTasks = storage.getString("tasks");
        if (storedTasks !== null && storedTasks !== undefined) {
          setTasks(JSON.parse(storedTasks));
        }
        setTasksFetched(true);
      } catch (e) {
        console.log(e);
      }
    };

    const fetchCurrentTaskId = () => {
      try {
        const storedCurrentTaskId = storage.getString("currentTaskId");
        if (storedCurrentTaskId !== null && storedCurrentTaskId !== undefined) {
          setCurrentTaskId(JSON.parse(storedCurrentTaskId));
          console.log("Current task id fetched:", currentTaskId);
        }
        setCurrentTaskIdFetched(true);
      } catch (e) {
        console.log(e);
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
          CurrentTaskIdFetched={currentTaskIdFetched}
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
