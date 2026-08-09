import { Redis } from "@upstash/redis";
import { promises as fs } from "fs";
import path from "path";

function getRedis() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

export function hasCloudStorage() {
  return Boolean(
    process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN,
  );
}

export function getStorageMode(): "cloud" | "file" {
  return hasCloudStorage() ? "cloud" : "file";
}

async function readFileJson<T>(relativePath: string): Promise<T> {
  const filePath = path.join(process.cwd(), relativePath);
  const raw = await fs.readFile(filePath, "utf8");
  return JSON.parse(raw) as T;
}

async function writeFileJson<T>(relativePath: string, value: T) {
  const filePath = path.join(process.cwd(), relativePath);
  await fs.writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

/**
 * Reads JSON from Upstash Redis when configured (Vercel-safe).
 * Falls back to local JSON files for development / VPS.
 * Seeds Redis from the file the first time a key is missing.
 */
export async function readStoredJson<T>(
  key: string,
  seedFilePath: string,
): Promise<T> {
  const redis = getRedis();

  if (redis) {
    const value = await redis.get<T>(key);
    if (value != null) return value;

    const seed = await readFileJson<T>(seedFilePath);
    await redis.set(key, seed);
    return seed;
  }

  return readFileJson<T>(seedFilePath);
}

export async function writeStoredJson<T>(
  key: string,
  seedFilePath: string,
  value: T,
): Promise<T> {
  const redis = getRedis();

  if (redis) {
    await redis.set(key, value);
    return value;
  }

  await writeFileJson(seedFilePath, value);
  return value;
}
