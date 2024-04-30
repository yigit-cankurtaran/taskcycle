import { atomWithStorage } from "jotai/utils";
import storage from "./helpers/Storage";
import { Task } from "./helpers/task.interface";

const atomStorage = {
    getItem: (key: string) => {
        const value = storage.getString(key);
        return value ? JSON.parse(value) : null;
    },
    setItem: (key: string, value: any) => {
        storage.set(key, JSON.stringify(value));
    },
    removeItem: (key: string) => {
        storage.delete(key);
    },
    // had to create this to integrate the storage with the jotai atoms
}

const getInitialState = (key: string, defaultValue: any) => {
    const value = atomStorage.getItem(key);
    return value !== null && value !== undefined ? value : defaultValue;
  };


export const tasksAtom = atomWithStorage<Task[]>("tasks", [], atomStorage);
export const currentTaskIdAtom = atomWithStorage<string | null>("currentTaskId", null, atomStorage);
export const tasksFetchedAtom = atomWithStorage("tasksFetched", false, atomStorage);
export const currentTaskIdFetchedAtom = atomWithStorage("currentTaskIdFetched", false, atomStorage);
export const currentTaskAtom = atomWithStorage<Task | null>("currentTask", null, atomStorage);
// problematic atoms start here
// worktime atom is now the user set value of 2, the rest are null
// fix this
// the issue might have been that they were already set
// by the time the storage was implemented
// TODO: check after building to apk as well
export const workTimeAtom = atomWithStorage("workTime", getInitialState("workTime", 0.2), atomStorage);
export const shortBreakTimeAtom = atomWithStorage("shortBreakTime", getInitialState("shortBreakTime", 0.1), atomStorage);
export const longBreakTimeAtom = atomWithStorage("longBreakTime", getInitialState("longBreakTime", 0.15), atomStorage);
export const pomodoroCountAtom = atomWithStorage("pomodoroCount", getInitialState("pomodoroCount", 4), atomStorage);