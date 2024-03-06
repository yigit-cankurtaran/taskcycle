// TaskScreen.tsx
import { useAtom } from "jotai";
import {
  tasksAtom,
  currentTaskIdAtom,
  tasksFetchedAtom,
  currentTaskIdFetchedAtom,
} from "./atoms";
import TaskLogic from "./TaskLogic";
import { View } from "react-native";

export default function TaskScreen() {
  const [tasks, setTasks] = useAtom(tasksAtom);
  const [currentTaskId, setCurrentTaskId] = useAtom(currentTaskIdAtom);
  const [tasksFetched, setTasksFetched] = useAtom(tasksFetchedAtom);
  const [currentTaskIdFetched, setCurrentTaskIdFetched] = useAtom(
    currentTaskIdFetchedAtom
  );

  return (
    <View>
      <TaskLogic
        tasks={tasks}
        setTasks={setTasks}
        setCurrentTaskId={setCurrentTaskId}
        currentTaskId={currentTaskId}
        TasksFetched={tasksFetched}
        CurrentTaskIdFetched={currentTaskIdFetched}
      />
    </View>
  );
}
