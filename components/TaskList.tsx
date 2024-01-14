import { View, Text, FlatList, StyleSheet } from "react-native";
import Task from "./Task";

// TODO: too many tasks and the top part moves up, becomes unuseable

// TODO: white string with "delete" on top of the task title when i swipe, look into it

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

  return (
    <View style={styles.container}>
      {startedTask && (
        <View id="started-task" style={styles.container}>
          <Text id="header">Started Task:</Text>
          <Task
            task={startedTask}
            onTaskDelete={onTaskDelete}
            onTaskComplete={onTaskComplete}
            onTaskEdit={onTaskEdit}
            onTaskStart={onTaskStart}
            currentTaskId={currentTaskId}
          />
        </View>
      )}
      {futureTasks.length > 0 && (
        <>
          <Text id="header">
            {futureTasks.length === 1 ? "Future Task:" : "Future Tasks:"}
          </Text>
          <View style={styles.listContainer}>
            <FlatList
              data={futureTasks}
              keyExtractor={(item) => item.id}
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
          </View>
        </>
      )}
      {finishedTasks.length > 0 && (
        <>
          <Text id="header">
            {finishedTasks.length === 1 ? "Finished Task:" : "Finished Tasks:"}
          </Text>
          <View style={styles.listContainer}>
            <FlatList
              data={finishedTasks}
              keyExtractor={(item) => item.id}
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
          </View>
        </>
      )}
    </View>
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
    maxWidth: "90%",
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
});
