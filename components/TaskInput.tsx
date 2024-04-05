import { useState, useEffect } from "react";
import { View, Dimensions } from "react-native";
import { TextInput } from "react-native-paper";
import { Task } from "./helpers/task.interface";
import MyButton from "./helpers/MyButton";
import { theme } from "./helpers/theme";

interface TaskInputProps {
  onTaskAdd: (title: string, pomodoros: number) => void;
  onTaskUpdate: (id: string, title: string, pomodoros: number) => void;
  editingTask: Task | null;
  setEditingTask: (task: Task | null) => void;
  onCancel: () => void;
}

const screenWidth = Dimensions.get("window").width;
const em = screenWidth / 375;

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
        mode="outlined"
        value={task}
        onChangeText={handleTaskChange}
        placeholder="Enter a task"
        style={{ margin: 5 }}
        error={task === ""}
        activeOutlineColor="#0077AA"
        outlineStyle={{ borderRadius: 10 * em }}
      />
      <TextInput
        mode="outlined"
        inputMode="numeric"
        value={String(pomodoros)}
        onChange={(e) => handlePomoChange(e.nativeEvent.text)}
        placeholder="Enter pomodoros"
        style={{ margin: 5 }}
        error={pomodoros === ""}
        activeOutlineColor="#0077AA"
        outlineStyle={{ borderRadius: 10 * em }}
      />
      <MyButton
        onPress={handleTaskAdd}
        style={{ alignSelf: "center", margin: theme.spacing.sm }}
      >
        Add
      </MyButton>
      <MyButton onPress={onCancel} style={{ alignSelf: "center" }}>
        Cancel
      </MyButton>
    </View>
  );
}
