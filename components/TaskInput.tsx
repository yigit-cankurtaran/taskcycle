import { useState, useEffect } from "react";
import { Text, View, TextInput, Pressable, StyleSheet } from "react-native";

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

  // function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
  //   if (e.key === "Enter") {
  //     handleTaskAdd();
  //   }
  // }
  // this may be unnecessary in native, let's see

  function handlePomoChange(text: string) {
    if (text === "") {
      setPomodoros("");
      // this might be an issue later on, keep an eye on it
    } else setPomodoros(parseInt(text, 10));
  }
  // pomodoros being string might be problematic, we'll see
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
        // pomodoros being string might be problematic, we'll see
        placeholder="Enter pomodoros"
        style={styles.input}
      />
      <Pressable
        onPress={handleTaskAdd}
        // style={({ pressed }) => [
        //   { backgroundColor: pressed ? "#005580" : "#0077AA" },
        // ]}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Add</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 10,
    margin: 5,
    backgroundColor: "#FFFFFF",
  },
  button: {
    backgroundColor: "#0077AA",
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
  },
});
