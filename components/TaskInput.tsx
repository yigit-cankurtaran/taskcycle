import { useState, useEffect } from "react";

interface Task {
  id: string;
  title: string;
  pomodoros: number;
  completed: boolean;
}

interface TaskInputProps {
  onTaskAdd: (title: string, pomodoros: number) => void;
  onTaskUpdate: (id: string, title: string, pomodoros: number) => void;
  editingTask: Task | null;
  setEditingTask: (task: Task | null) => void;
}

export default function TaskInput({
  onTaskAdd,
  onTaskUpdate,
  editingTask,
  setEditingTask,
}: TaskInputProps) {
  const [task, setTask] = useState("");
  const [pomodoros, setPomodoros] = useState(1);

  // populating inputs with editingTask values
  useEffect(() => {
    if (editingTask) {
      setTask(editingTask.title);
      setPomodoros(editingTask.pomodoros);
    }
  }, [editingTask]);

  function handleTaskChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTask(e.target.value);
  }

  function handleTaskAdd() {
    if (task.trim() !== "") {
      // the trim() method removes whitespace from both ends of a string
      // pomodoro(s) update failed due to integer/string issues, this is the fix
      const numPomodoros = Number(pomodoros);
      if (editingTask) {
        onTaskUpdate(editingTask.id, task, numPomodoros);
        setEditingTask(null);
      } else {
        onTaskAdd(task, numPomodoros);
      }
      setTask("");
      setPomodoros(1);
    } else alert("Please enter a task");
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleTaskAdd();
    }
  }

  function handlePomoChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPomodoros(Number(e.target.value));
  }

  return (
    <div className="flex justify-center gap-2 m-6">
      <input
        type="text"
        name="task"
        value={task}
        onChange={handleTaskChange}
        onKeyDown={handleKeyDown}
        placeholder="Enter a task"
        className="rounded-md text-black shadow p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100"
      />
      <input
        type="number"
        name="pomodoros"
        value={pomodoros}
        onChange={handlePomoChange}
        className="rounded-md shadow p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 text-gray-400"
      />
      <button
        onClick={handleTaskAdd}
        className="rounded-md p-2 bg-blue-500 text-blue-300 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Add
      </button>
    </div>
  );
}
