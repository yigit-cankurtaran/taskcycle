import { useState, useEffect } from "react";
import TaskInput from "./TaskInput";
import TaskList from "./TaskList";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
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
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  setCurrentTaskId: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function TaskLogic({
  tasks,
  currentTaskId,
  setTasks,
  setCurrentTaskId,
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
    setCurrentTaskId(id);
    console.log("Task started: " + id);
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
    // TODO: trigger this with a long press instead of a button
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

  useEffect(() => {
    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
      } catch (error) {
        console.error(error);
      }
    };

    saveTasks();
  }, [tasks]);

  useEffect(() => {
    const saveCurrentTaskId = async () => {
      try {
        await AsyncStorage.setItem(
          "currentTaskId",
          JSON.stringify(currentTaskId)
        );
      } catch (error) {
        console.error(error);
      }
    };

    saveCurrentTaskId();
  }, [currentTaskId]);
  // converted from localStorage to AsyncStorage
  // test after finishing the other components

  return (
    <View style={styles.container}>
      {/* this view needs to be fixed */}
      {/* takes up too much of the screen */}
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
        // this might be problematic
        // it was, fixed with its own styles
      />
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
  },
});
