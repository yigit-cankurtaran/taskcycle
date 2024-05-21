import { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { TextInput } from "react-native-paper";
import { Task } from "./helpers/task.interface";
import MyButton from "./helpers/MyButton";
import { theme } from "./helpers/theme";
import Toast from "react-native-toast-message";

interface TaskInputProps {
  onTaskAdd: (title: string, pomodoros: number) => void;
  onTaskUpdate: (id: string, title: string, pomodoros: number) => void;
  editingTask: Task | null;
  setEditingTask: (task: Task | null) => void;
  onCancel: () => void;
}

function showToast(message: string) {
  Toast.show({
    type: "error",
    text1: message,
    position: "bottom",
    visibilityTime: 3000,
    autoHide: true,
  });
}

export default function TaskInput({
  onTaskAdd,
  onTaskUpdate,
  editingTask,
  setEditingTask,
  onCancel,
}: TaskInputProps) {
  const [task, setTask] = useState("");
  const [pomodoros, setPomodoros] = useState<number | "">(1);

  // populating inputs with editingTask values
  useEffect(() => {
    if (editingTask) {
      setTask(editingTask.title);
      setPomodoros(editingTask.pomodoros);
    }
  }, [editingTask]);

  function handleTaskChange(text: string) {
    setTask(text);
  }

  function handleTaskAdd() {
    if (task.trim() !== "") {
      // the trim() method removes whitespace from both ends of a string
      // pomodoro(s) update failed due to integer/string issues, this is the fix
      const numPomodoros = Number(pomodoros);
      if (isNaN(numPomodoros) || numPomodoros < 1) {
        alert("Please enter a valid number of pomodoros");
        return;
      }
      if (editingTask) {
        onTaskUpdate(editingTask.id, task, numPomodoros);
        setEditingTask(null);
      } else {
        onTaskAdd(task, numPomodoros);
      }
      setTask("");
      setPomodoros(1);
    } else showToast("Please enter a task");
    // later on we can change this to a toast message
  }

  function handlePomoChange(text: string) {
    if (text === "") {
      setPomodoros("");
      // this might be an issue later on, keep an eye on it
    } else {
      const parsedPomodoros = parseInt(text, 10);
      if (parsedPomodoros >= 1) {
        setPomodoros(parsedPomodoros);
      }
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        label="Task"
        value={task}
        onChangeText={handleTaskChange}
        error={task === ""}
        style={styles.input}
        activeOutlineColor={theme.colors.primary}
      />
      <TextInput
        mode="outlined"
        label="Pomodoros"
        inputMode="numeric"
        value={String(pomodoros)}
        onChange={(e) => handlePomoChange(e.nativeEvent.text)}
        placeholder="Enter pomodoros"
        error={pomodoros === ""}
        activeOutlineColor={theme.colors.primary}
        style={styles.input}
      />
      <MyButton onPress={handleTaskAdd} style={styles.button}>
        Add
      </MyButton>
      <MyButton onPress={onCancel} style={styles.button}>
        Cancel
      </MyButton>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    margin: theme.spacing.md,
    width: "70%",
  },
  button: {
    margin: theme.spacing.sm,
    alignSelf: "center",
    width: "40%",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("window").width,
    padding: theme.spacing.md,
  },
});
