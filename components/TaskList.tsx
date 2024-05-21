import { FlatList, View } from "react-native";
import TaskComponent from "./TaskComponent";
import { Text, Title } from "react-native-paper";
import { Task } from "./helpers/task.interface";

interface TaskListProps {
  tasks: Task[];
  onTaskDelete: (id: string) => void;
  onTaskComplete: (id: string) => void;
  onTaskEdit: (id: string) => void;
  onTaskStart: (id: string) => void;
  currentTaskId: string;
}

// TODO: create a basic tasks group that showcases the app's functionality

export default function TaskList({
  tasks,
  onTaskDelete,
  onTaskComplete,
  onTaskEdit,
  onTaskStart,
  currentTaskId,
}: TaskListProps) {
  const startedTask = tasks
    ? tasks.find((task) => task.id === currentTaskId)
    : null;
  const finishedTasks = tasks ? tasks.filter((task) => task.completed) : [];
  const futureTasks = tasks
    ? tasks.filter((task) => task.id !== currentTaskId && !task.completed)
    : [];

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

  const hasTasks = data.some((item) => item.tasks.length > 0);

  return hasTasks ? (
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
  ) : (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Text style={{ textAlign: "center", fontSize: 16 }}>
        No tasks. Add some to get started.
      </Text>
    </View>
  );
}
