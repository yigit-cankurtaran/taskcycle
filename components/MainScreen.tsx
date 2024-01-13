import TimerView from "./TimerView";
import TaskLogic from "./TaskLogic";
import { useState, useEffect } from "react";
// import storage from "./Storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, StyleSheet } from "react-native";

interface Task {
  id: string;
  title: string;
  pomodoros: number;
  completed: boolean;
}

// TODO: implement a dark mode

export default function MainScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentTaskId, setCurrentTaskId] = useState<string | null>(null);
  const [tasksFetched, setTasksFetched] = useState(false);
  const [currentTaskIdFetched, setCurrentTaskIdFetched] = useState(false);

  // useEffect(() => {
  //   const fetchTasks = () => {
  //     try {
  //       const storedTasks = storage.getString("tasks");
  //       if (storedTasks !== null && storedTasks !== undefined) {
  //         setTasks(JSON.parse(storedTasks));
  //       }
  //       setTasksFetched(true);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };

  //   const fetchCurrentTaskId = () => {
  //     try {
  //       const storedCurrentTaskId = storage.getString("currentTaskId");
  //       if (storedCurrentTaskId !== null && storedCurrentTaskId !== undefined) {
  //         setCurrentTaskId(JSON.parse(storedCurrentTaskId));
  //         console.log("Current task id fetched:", currentTaskId);
  //       }
  //       setCurrentTaskIdFetched(true);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };

  //   fetchTasks();
  //   fetchCurrentTaskId();
  // }, []);

  // ^^ MMKV storage, not supported in expo go
  // will uncomment if i make a dev client

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem("tasks");
        if (storedTasks !== null) {
          setTasks(JSON.parse(storedTasks));
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
        console.log("Current task id fetched:", currentTaskId);
      }
      setCurrentTaskIdFetched(true);
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
        <View
        // style={{ backgroundColor: "red" }}
        >
          <TimerView pomodoroDecrease={decreaseCurrentTaskPomodoros} />
        </View>
        <View
        // style={{ backgroundColor: "blue" }}
        // in case you need to troubleshoot
        // uncomment these
        >
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
