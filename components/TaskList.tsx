import { FlatList, View } from "react-native";
import TaskComponent from "./TaskComponent";
import { Title } from "react-native-paper";
import { Task } from "./helpers/task.interface";

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
    // FlatList makes it scrollable
    <FlatList
      data={data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <>
          {item.header && item.tasks.length > 0 && (
            <Title style={{ textAlign: "center", marginTop: 10 }}>
              {item.header}
            </Title>
          )}
          <FlatList
            data={item.tasks}
            keyExtractor={(task) => task.id}
            renderItem={({ item }) => (
              <View>
                <TaskComponent
                  task={item}
                  onTaskDelete={onTaskDelete}
                  onTaskComplete={(id) => {
                    onTaskComplete(id);
                  }}
                  onTaskEdit={onTaskEdit}
                  onTaskStart={onTaskStart}
                  currentTaskId={currentTaskId}
                />
              </View>
            )}
          />
        </>
      )}
    />
  );
}
