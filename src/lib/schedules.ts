import { readStoredJson, writeStoredJson } from "@/lib/storage";

export type ScheduleClass = {
  time: string;
  name: string;
  note?: string;
  instructor?: string;
};

export type ScheduleDay = {
  day: string;
  classes: ScheduleClass[];
};

export type ScheduleBlock = {
  eyebrow: string;
  title: string;
  lead: string;
  scheduleTitle: string;
  scheduleNote: string;
  days: ScheduleDay[];
};

export type SchedulesData = {
  updatedAt: string;
  autumn: ScheduleBlock;
  summer: ScheduleBlock;
};

const STORAGE_KEY = "loisto:schedules";
const SEED_FILE = "data/schedules.json";

export async function getSchedules(): Promise<SchedulesData> {
  return readStoredJson<SchedulesData>(STORAGE_KEY, SEED_FILE);
}

export async function saveSchedules(
  data: SchedulesData,
): Promise<SchedulesData> {
  const next: SchedulesData = {
    ...data,
    updatedAt: new Date().toISOString(),
  };
  return writeStoredJson(STORAGE_KEY, SEED_FILE, next);
}

export function isSchedulesData(value: unknown): value is SchedulesData {
  if (!value || typeof value !== "object") return false;
  const data = value as Partial<SchedulesData>;
  return (
    !!data.autumn &&
    !!data.summer &&
    Array.isArray(data.autumn.days) &&
    Array.isArray(data.summer.days)
  );
}
