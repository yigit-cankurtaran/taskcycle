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
    <div>
      {startedTask && (
        <div className="current-task">
          <h1 className="text-lg font-bold text-center">Started Task:</h1>
          <Task
            task={startedTask}
            onTaskDelete={onTaskDelete}
            onTaskComplete={onTaskComplete}
            onTaskEdit={onTaskEdit}
            onTaskStart={onTaskStart}
          />
        </div>
      )}
      <h1 className="text-lg font-bold text-center">
        {futureTasks.length === 1 ? "Future Task:" : "Future Tasks:"}
      </h1>
      <ul>
        {futureTasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onTaskDelete={onTaskDelete}
            onTaskComplete={onTaskComplete}
            onTaskEdit={onTaskEdit}
            onTaskStart={onTaskStart}
          />
        ))}
      </ul>
      <h1 className="text-lg font-bold text-center">
        {finishedTasks.length === 1 ? "Finished Task:" : "Finished Tasks:"}
      </h1>
      <ul>
        {finishedTasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onTaskDelete={onTaskDelete}
            onTaskComplete={onTaskComplete}
            onTaskEdit={onTaskEdit}
            onTaskStart={onTaskStart}
          />
        ))}
      </ul>
    </div>
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
    <li className="list-none flex items-center justify-between text-center">
      <label className="flex items-center">
        <input
          type="checkbox"
          name="completion"
          checked={task.completed}
          onChange={() => onTaskComplete(task.id)}
          className="mr-1 focus:outline-none appearance-none w-4 h-4 border border-gray-300 rounded-md checked:bg-blue-500 checked:border-transparent focus:ring-blue-500 focus:ring-offset-0 focus:ring-opacity-50 hover:bg-gray-300"
        />
        <span className={`ml-2 ${task.completed ? "line-through" : ""}`}>
          {task.title} - {task.pomodoros} {pomodoroText}
        </span>
      </label>
      <div>
        <button
          className="text-blue-300 rounded-2xl ml-1 mr-1 p-1.5 bg-gray-800 hover:bg-gray-900 focus:outline-none"
          onClick={() => onTaskEdit(task.id)}
        >
          Edit
        </button>
        <button
          className="text-blue-300 rounded-2xl mr-1 ml-1 p-1.5 bg-gray-800 hover:bg-gray-900 focus:outline-none"
          onClick={() => onTaskStart(task.id)}
        >
          Start
        </button>
        <button
          className="text-blue-300 rounded-2xl mr-1 ml-1 p-1.5 bg-gray-800 hover:bg-gray-900 focus:outline-none"
          onClick={() => onTaskDelete(task.id)}
        >
          Delete
        </button>
      </div>
    </li>
  );
}
