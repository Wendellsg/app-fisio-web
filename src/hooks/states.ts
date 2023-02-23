import { atom } from "jotai";
import { Activity, Routine } from "../types";

export const userAtom = atom<string | boolean>(false);
export const routinesAtom = atom<Routine[]>([]);
export const routineAtom = atom<Routine>({} as Routine);
export const activityAtom = atom<Activity>({} as Activity);
export const activitiesAtom = atom<Activity[]>([]);
export const patientActivitiesAtom = atom<Activity[]>([]);
