import { useAtom } from "jotai";
import {
  tasksAtom,
  currentTaskIdAtom,
  tasksFetchedAtom,
  currentTaskIdFetchedAtom,
} from "./atoms";
import TaskLogic from "./TaskLogic";
import { View } from "react-native";
import { theme } from "./helpers/theme";

export default function TaskScreen() {
  const [tasks, setTasks] = useAtom(tasksAtom);
  const [currentTaskId, setCurrentTaskId] = useAtom(currentTaskIdAtom);
  const [tasksFetched, setTasksFetched] = useAtom(tasksFetchedAtom);
  const [currentTaskIdFetched, setCurrentTaskIdFetched] = useAtom(
    currentTaskIdFetchedAtom
  );

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
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
