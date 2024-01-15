import TimerView from "./TimerView";
import TaskLogic from "./TaskLogic";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView, View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
  const insets = useSafeAreaInsets();

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
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={[
          styles.container,
          { paddingTop: insets.top, paddingBottom: insets.bottom },
        ]}
      >
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 16,
  },
  centeredView: {
    flex: 1,
    alignItems: "center",
  },
});
