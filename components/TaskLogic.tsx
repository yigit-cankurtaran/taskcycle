import { useState, useEffect } from "react";
import TaskInput from "./TaskInput";
import TaskList from "./TaskList";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
// import storage from "./Storage";
// using storage from a central location
// TODO: MMKV doesn't work with expo go???
// put the asyncstorage solution back in, comment it when building APK
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, StyleSheet } from "react-native";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  pomodoros: number;
}

interface TaskLogicProps {
  tasks: Task[];
  currentTaskId: string | null;
  TasksFetched: boolean;
  CurrentTaskIdFetched: boolean;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  setCurrentTaskId: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function TaskLogic({
  tasks,
  currentTaskId,
  setTasks,
  setCurrentTaskId,
  TasksFetched,
  CurrentTaskIdFetched,
}: TaskLogicProps) {
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  function handleTaskAdd(task: string, pomodoros: number) {
    const newTask = {
      id: uuidv4(),
      title: task,
      completed: false,
      pomodoros,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    console.log("Task added: " + newTask.id);
  }

  function handleTaskStart(id: string) {
    const task = tasks.find((task) => task.id === id);
    if (task && task.completed) {
      return;
    }
    if (currentTaskId === id) {
      setCurrentTaskId(null);
    } else {
      setCurrentTaskId(id);
    }
    console.log("Task started: " + currentTaskId);
  }

  function handleTaskDelete(id: string) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    console.log("Task deleted: " + id);
  }

  function handleTaskComplete(id: string) {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === id) {
          const updatedTask = { ...task, completed: !task.completed };
          return updatedTask;
        }
        return task;
      })
    );

    if (currentTaskId === id) {
      setCurrentTaskId(null);
    }

    console.log("Task completed: " + id);
  }

  function handleTaskEdit(id: string) {
    const currentTask = tasks.find((task) => task.id === id);
    setEditingTask((currentTask: Task | null) => currentTask || null);
    // TODO: make this actually work
    console.log("editing task: " + id);
  }

  function handleTaskUpdate(
    id: string,
    newTitle: string,
    newPomodoros: number
  ) {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === id) {
          const updatedTask = {
            ...task,
            title: newTitle,
            pomodoros: newPomodoros,
          };
          return updatedTask;
        }
        return task;
      })
    );
    console.log("Task edited: " + id);
  }

  // useEffect(() => {
  //   const saveTasks = () => {
  //     if (TasksFetched) {
  //       storage.set("tasks", JSON.stringify(tasks));
  //     }
  //   };

  //   saveTasks();
  // }, [tasks]);

  // useEffect(() => {
  //   const saveCurrentTaskId = () => {
  //     if (CurrentTaskIdFetched) {
  //       storage.set("currentTaskId", JSON.stringify(currentTaskId));
  //       console.log("Current task id saved to storage:", currentTaskId);
  //     }
  //   };

  //   saveCurrentTaskId();
  // }, [currentTaskId]);

  useEffect(() => {
    const saveTasks = async () => {
      try {
        if (TasksFetched) {
          await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
        }
      } catch (error) {
        console.error(error);
      }
    };

    saveTasks();
  }, [tasks]);

  useEffect(() => {
    const saveCurrentTaskId = async () => {
      try {
        if (CurrentTaskIdFetched) {
          await AsyncStorage.setItem(
            "currentTaskId",
            JSON.stringify(currentTaskId)
          );
          console.log("Current task id saved to storage:", currentTaskId);
        }
      } catch (error) {
        console.error(error);
      }
    };

    saveCurrentTaskId();
  }, [currentTaskId]);

  return (
    <View style={styles.container}>
      <View style={styles.centeredView}>
        <TaskInput
          onTaskAdd={handleTaskAdd}
          onTaskUpdate={handleTaskUpdate}
          editingTask={editingTask}
          setEditingTask={setEditingTask}
        />
        <TaskList
          tasks={tasks}
          onTaskDelete={handleTaskDelete}
          onTaskComplete={handleTaskComplete}
          onTaskEdit={handleTaskEdit}
          onTaskStart={handleTaskStart}
          currentTaskId={currentTaskId || ""}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
  },
});
