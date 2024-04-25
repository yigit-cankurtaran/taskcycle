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
// TODO: these would restore back to original when the app is closed
// make sure to implement a way to save the user's settings
export const workTimeAtom = atom(0.2);
// export const shortBreakTimeAtom = atom(5);
export const shortBreakTimeAtom = atom(0.1);
// export const longBreakTimeAtom = atom(15);
export const longBreakTimeAtom = atom(0.15);
export const pomodoroCountAtom = atom(4);