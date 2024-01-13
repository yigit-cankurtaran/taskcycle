import { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  Pressable,
  StyleSheet,
  Dimensions,
} from "react-native";

interface Task {
  id: string;
  title: string;
  pomodoros: number;
  completed: boolean;
}

interface TaskInputProps {
  onTaskAdd: (title: string, pomodoros: number) => void;
  onTaskUpdate: (id: string, title: string, pomodoros: number) => void;
  editingTask: Task | null;
  setEditingTask: (task: Task | null) => void;
}

const screenWidth = Dimensions.get("window").width;
const em = screenWidth / 375;

export default function TaskInput({
  onTaskAdd,
  onTaskUpdate,
  editingTask,
  setEditingTask,
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
    } else alert("Please enter a task");
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
    <View>
      <TextInput
        value={task}
        onChangeText={handleTaskChange}
        placeholder="Enter a task"
        style={styles.input}
      />
      <TextInput
        inputMode="numeric"
        value={String(pomodoros)}
        onChange={(e) => handlePomoChange(e.nativeEvent.text)}
        placeholder="Enter pomodoros"
        style={styles.input}
      />
      <Pressable onPress={handleTaskAdd} style={styles.button}>
        <Text style={styles.buttonText}>Add</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: 150 * em,
    // em normally not supported, i created it on top
    padding: 10,
    margin: 5,
    backgroundColor: "#F3F3F3",
    borderRadius: 10,
  },
  button: {
    width: 150 * em,
    backgroundColor: "#0077AA",
    padding: 10,
    margin: 5,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
  },
});
