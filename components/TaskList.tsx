import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

// TODO: make buttons next to the task instead of below it
// TODO: make buttons smaller
// TODO: make button size consistent

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
        <View id="started-task">
          <Text id="header">Started Task:</Text>
          <Task
            task={startedTask}
            onTaskDelete={onTaskDelete}
            onTaskComplete={onTaskComplete}
            onTaskEdit={onTaskEdit}
            onTaskStart={onTaskStart}
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
}: TaskProps) {
  const pomodoroText = task.pomodoros === 1 ? "pomodoro" : "pomodoros";

  return (
    <View>
      <View>
        <BouncyCheckbox
          isChecked={task.completed}
          onPress={() => onTaskComplete(task.id)}
          // might be problematic, test and see later
        />
        <Text>
          {task.title} - {task.pomodoros} {pomodoroText}
        </Text>
      </View>
      <View>
        <Button
          title="Edit"
          onPress={() => onTaskEdit(task.id)}
          color="#0077AA"
        />
        <Button
          title="Start"
          onPress={() => onTaskStart(task.id)}
          color="#0077AA"
        />
        <Button
          title="Delete"
          onPress={() => onTaskDelete(task.id)}
          color="#0077AA"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    width: "100%",
    // flatlist takes as much space as it can
    // this limits it to the width of the screen
  },
});
