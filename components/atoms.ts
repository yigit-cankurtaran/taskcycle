import { atom } from "jotai";
import { Task } from "./helpers/task.interface";


export const tasksAtom = atom<Task[]>([]);
export const currentTaskIdAtom = atom<string | null>(null);
export const tasksFetchedAtom = atom(false);
export const currentTaskIdFetchedAtom = atom(false);
export const currentTaskAtom = atom<Task | null>(null);
// the commented values are gonna be the actual stuff
// uncomment when you're ready to implement the settings screen
// export const workTimeAtom = atom(25);
export const workTimeAtom = atom(0.4);
// export const shortBreakTimeAtom = atom(5);
export const shortBreakTimeAtom = atom(0.2);
// export const longBreakTimeAtom = atom(15);
export const longBreakTimeAtom = atom(0.3);
export const pomodoroCountAtom = atom(4);