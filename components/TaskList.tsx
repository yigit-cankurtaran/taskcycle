import { Text, FlatList, StyleSheet } from "react-native";
import Task from "./Task";

// TODO: white string with "delete" on top of the task title when i swipe, look into it

// TODO: fix TimerView being cut off by the camera

interface Task {
  id: string;
  title: string;
  pomodoros: number;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  onTaskDelete: (id: string) => void;
  onTaskComplete: (id: string) => void;
  onTaskEdit: (id: string) => void;
  onTaskStart: (id: string) => void;
  currentTaskId: string;
}

export default function TaskList({
  tasks,
  onTaskDelete,
  onTaskComplete,
  onTaskEdit,
  onTaskStart,
  currentTaskId,
}: TaskListProps) {
  const startedTask = tasks.find((task) => task.id === currentTaskId);
  const finishedTasks = tasks.filter((task) => task.completed);
  const futureTasks = tasks.filter(
    (task) => task.id !== currentTaskId && !task.completed
  );

  const data = [
    { header: "Started Task:", tasks: startedTask ? [startedTask] : [] },
    {
      header: futureTasks.length === 1 ? "Future Task:" : "Future Tasks:",
      tasks: futureTasks,
    },
    {
      header: finishedTasks.length === 1 ? "Finished Task:" : "Finished Tasks:",
      tasks: finishedTasks,
    },
  ];

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <>
          {item.header && item.tasks.length > 0 && (
            <Text
              id="header"
              style={[styles.normalTask, styles.centeredHeader]}
            >
              {item.header}
            </Text>
          )}
          <FlatList
            contentContainerStyle={styles.listContainer}
            data={item.tasks}
            keyExtractor={(task) => task.id}
            renderItem={({ item }) => (
              <Task
                task={item}
                onTaskDelete={onTaskDelete}
                onTaskComplete={onTaskComplete}
                onTaskEdit={onTaskEdit}
                onTaskStart={onTaskStart}
                currentTaskId={currentTaskId}
              />
            )}
          />
        </>
      )}
    />
  );
}

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  listContainer: {
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "100%",
    backgroundColor: "red",
  },
  buttonContainer: {
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#0077AA",
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  completedTask: {
    textDecorationLine: "line-through",
    flexShrink: 1,
  },
  normalTask: {
    flexShrink: 1,
  },
  centeredHeader: {
    textAlign: "center",
  },
});
