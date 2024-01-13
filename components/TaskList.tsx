import { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  Animated,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import {
  LongPressGestureHandler,
  State,
  GestureHandlerStateChangeEvent,
  Swipeable,
} from "react-native-gesture-handler";

// TODO: check on phone screen with long tasks
// to see if button gets cut off

// TODO: too many tasks and the top part moves up, becomes unuseable

// TODO: white string with "delete" when i swipe, look into it

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
  const [scaleValue] = useState(new Animated.Value(1));
  const [dragXValue, setDragXValue] = useState(0);

  // what to do when the task is long pressed
  const onLongPress = ({ nativeEvent }: GestureHandlerStateChangeEvent) => {
    if (nativeEvent.state === State.BEGAN) {
      Animated.spring(scaleValue, {
        toValue: 0.9,
        useNativeDriver: true,
      }).start();
    }
    if (nativeEvent.state === State.END || nativeEvent.state === State.FAILED) {
      Animated.spring(scaleValue, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }
    if (nativeEvent.state === State.ACTIVE) {
      onTaskEdit(task.id);
    }
  };

  // what to do when the task is swiped
  // weird code but it works and it works well
  useEffect(() => {
    if (Math.abs(dragXValue) > 100) {
      // Change 100 to the threshold you want
      onTaskDelete(task.id);
    }
  }, [dragXValue]);

  const renderAction = (
    progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>,
    direction: "left" | "right"
  ) => {
    dragX.removeAllListeners();
    dragX.addListener(({ value }) => setDragXValue(value));

    const trans = dragX.interpolate({
      inputRange:
        direction === "right" ? [0, 50, 100, 101] : [-101, -100, -50, 0],
      outputRange: direction === "right" ? [-20, 0, 0, 1] : [1, 0, 0, -20],
    });
    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
        <Text style={styles.buttonText}>Delete</Text>
      </Animated.View>
    );
  };

  return (
    <Swipeable
      renderRightActions={(progress, dragX) =>
        renderAction(progress, dragX, "right")
      }
      renderLeftActions={(progress, dragX) =>
        renderAction(progress, dragX, "left")
      }
    >
      <LongPressGestureHandler
        onHandlerStateChange={onLongPress}
        minDurationMs={800}
      >
        <Animated.View
          style={[styles.container, { transform: [{ scale: scaleValue }] }]}
        >
          <View style={styles.taskContainer}>
            <View style={styles.listContainer}>
              <BouncyCheckbox
                isChecked={task.completed}
                onPress={() => onTaskComplete(task.id)}
                bounceEffect={3}
              />
              <Text
                style={
                  task.completed ? styles.completedTask : styles.normalTask
                }
              >
                {task.title} - {task.pomodoros} {pomodoroText}
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              {task.completed ? null : (
                <>
                  <Pressable
                    style={styles.button}
                    onPress={() => onTaskStart(task.id)}
                  >
                    <Text style={styles.buttonText}>
                      {isStarted ? "Stop" : "Start"}
                    </Text>
                  </Pressable>
                </>
              )}
            </View>
          </View>
        </Animated.View>
      </LongPressGestureHandler>
    </Swipeable>
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
  },
  normalTask: {},
});
