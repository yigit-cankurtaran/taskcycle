import { Card, Text } from "react-native-paper";
import MyButton from "./helpers/MyButton";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import {
  LongPressGestureHandler,
  State,
  GestureHandlerStateChangeEvent,
  Swipeable,
} from "react-native-gesture-handler";
import { useState, useEffect } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { Task } from "./helpers/task.interface";
import { theme } from "./helpers/theme";
interface TaskProps {
  task: Task;
  onTaskDelete: (id: string) => void;
  onTaskComplete: (id: string) => void;
  onTaskEdit: (id: string) => void;
  onTaskStart: (id: string) => void;
  currentTaskId: string;
}
export default function TaskComponent({
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
      Animated.spring(scaleValue, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
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
    // progress looks like it's unused but it's necessary for the animation to work
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
        {/* <Text style={styles.buttonText}>Delete</Text> */}
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
          <Card style={styles.taskContainer}>
            <Card.Content>
              <View style={styles.taskContainer}>
                <BouncyCheckbox
                  isChecked={task.completed}
                  onPress={() => onTaskComplete(task.id)}
                  bounceEffect={3}
                />
                <Text
                  style={
                    task.completed ? styles.completedTask : styles.normalTask
                  }
                  ellipsizeMode="tail"
                >
                  {task.title} - {task.pomodoros} {pomodoroText}
                </Text>
                <View style={styles.buttonContainer}>
                  {task.completed ? null : (
                    <>
                      <MyButton
                        onPress={() => onTaskStart(task.id)}
                        style={{ marginLeft: theme.spacing.sm }}
                      >
                        {isStarted ? "Stop" : "Start"}
                      </MyButton>
                    </>
                  )}
                </View>
              </View>
            </Card.Content>
          </Card>
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
    maxWidth: "100%",
  },
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  buttonContainer: {
    justifyContent: "center",
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
