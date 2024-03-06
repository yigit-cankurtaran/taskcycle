import { atom } from "jotai";
import { Task } from "./helpers/task.interface";


export const tasksAtom = atom<Task[]>([]);
export const currentTaskIdAtom = atom<string | null>(null);
export const tasksFetchedAtom = atom(false);
export const currentTaskIdFetchedAtom = atom(false);