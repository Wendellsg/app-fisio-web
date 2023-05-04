import { atom } from "jotai";
import { Activity, Exercise, Routine } from "../types";

export const userAtom = atom<string | boolean>(false);
export const routinesAtom = atom<Routine[]>([]);
export const routineAtom = atom<Routine>({} as Routine);
export const exercisesAtom = atom<Exercise[]>([]);
export const exerciseAtom = atom<Exercise>({} as Exercise);
export const activityAtom = atom<Activity>({} as Activity);
export const activitiesAtom = atom<Activity[]>([]);
export const patientActivitiesAtom = atom<Activity[]>([]);
