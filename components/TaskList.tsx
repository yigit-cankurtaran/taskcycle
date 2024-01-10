import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

// TODO: make buttons next to the task instead of below it
// conflicted on this, look into it after testing on phone.

interface Task {
  id: string;
  title: string;
  pomodoros: number;
  completed: boolean;
}

interface TaskProps {
  task: Task;
  onTaskDelete: (id: string) => void;
  onTaskComplete: (id: string) => void;
  onTaskEdit: (id: string) => void;
  onTaskStart: (id: string) => void;
  currentTaskId: string;
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
    </View>
  );
}

function Task({
  task,
  onTaskDelete,
  onTaskComplete,
  onTaskEdit,
  onTaskStart,
  currentTaskId,
}: TaskProps) {
  const pomodoroText = task.pomodoros === 1 ? "pomodoro" : "pomodoros";
  const isStarted = task.id === currentTaskId;

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <BouncyCheckbox
          isChecked={task.completed}
          onPress={() => onTaskComplete(task.id)}
        />
        <Text style={task.completed ? styles.completedTask : styles.normalTask}>
          {task.title} - {task.pomodoros} {pomodoroText}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        {task.completed ? (
          <Pressable
            style={styles.button}
            onPress={() => onTaskDelete(task.id)}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </Pressable>
        ) : (
          <>
            <Pressable
              style={styles.button}
              onPress={() => onTaskEdit(task.id)}
            >
              <Text style={styles.buttonText}>Edit</Text>
            </Pressable>
            <Pressable
              style={styles.button}
              onPress={() => onTaskStart(task.id)}
            >
              <Text style={styles.buttonText}>
                {isStarted ? "Stop" : "Start"}
              </Text>
            </Pressable>
            <Pressable
              style={styles.button}
              onPress={() => onTaskDelete(task.id)}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </Pressable>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    flex: 1,
    // the buttons change their position according to the longest task, look into this
    alignItems: "center",
    padding: 10,
  },
  listContainer: {
    width: "100%",
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
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
  },
  normalTask: {},
});
