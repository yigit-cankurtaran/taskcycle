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
    let value = atomStorage.getItem(key);
    if (value === null || value === undefined) {
        value = defaultValue;
        atomStorage.setItem(key, defaultValue);
        // if the value is not set, set it to the default value
        // this fixes the null issue
    }
    return value;
};

export const tasksAtom = atomWithStorage<Task[]>("tasks", [], atomStorage);
export const currentTaskIdAtom = atomWithStorage<string | null>("currentTaskId", null, atomStorage);
export const tasksFetchedAtom = atomWithStorage("tasksFetched", false, atomStorage);
export const currentTaskIdFetchedAtom = atomWithStorage("currentTaskIdFetched", false, atomStorage);
export const currentTaskAtom = atomWithStorage<Task | null>("currentTask", null, atomStorage);
// export const workTimeAtom = atomWithStorage("workTime", getInitialState("workTime", 0.2), atomStorage);
// export const shortBreakTimeAtom = atomWithStorage("shortBreakTime", getInitialState("shortBreakTime", 0.1), atomStorage);
// export const longBreakTimeAtom = atomWithStorage("longBreakTime", getInitialState("longBreakTime", 0.15), atomStorage);
// export const pomodoroCountAtom = atomWithStorage("pomodoroCount", getInitialState("pomodoroCount", 4), atomStorage);
// comments are for testing
export const workTimeAtom = atomWithStorage("workTime", getInitialState("workTime", 25), atomStorage);
export const shortBreakTimeAtom = atomWithStorage("shortBreakTime", getInitialState("shortBreakTime", 5), atomStorage);
export const longBreakTimeAtom = atomWithStorage("longBreakTime", getInitialState("longBreakTime", 15), atomStorage);
export const pomodoroCountAtom = atomWithStorage("pomodoroCount", getInitialState("pomodoroCount", 4), atomStorage);