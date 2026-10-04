import { readStoredJson, writeStoredJson } from "@/lib/storage";

export type FlyerImage = {
  mime: "image/jpeg" | "image/png" | "image/webp";
  data: string;
  updatedAt: string;
};

export const DEFAULT_FLYER_SRC = "/images/tarjoukset-flyer.png";
export const FLYER_API_PATH = "/api/media/flyer";

const STORAGE_KEY = "loisto:flyer";
const SEED_FILE = "data/flyer.json";

export const FLYER_MAX_BYTES = 3.5 * 1024 * 1024;

export async function getFlyer(): Promise<FlyerImage | null> {
  try {
    const value = await readStoredJson<FlyerImage | null>(STORAGE_KEY, SEED_FILE);
    if (!value?.data || !value.mime) return null;
    return value;
  } catch {
    return null;
  }
}

export async function saveFlyer(image: FlyerImage): Promise<FlyerImage> {
  return writeStoredJson(STORAGE_KEY, SEED_FILE, image);
}

export async function clearFlyer() {
  await writeStoredJson(STORAGE_KEY, SEED_FILE, {
    mime: "image/png",
    data: "",
    updatedAt: new Date().toISOString(),
  } satisfies Pick<FlyerImage, "mime" | "data" | "updatedAt">);
}

export function flyerSrc(image: FlyerImage | null): string {
  if (!image) return DEFAULT_FLYER_SRC;
  return `${FLYER_API_PATH}?v=${encodeURIComponent(image.updatedAt)}`;
}

export function sniffImageMime(bytes: Uint8Array): FlyerImage["mime"] | null {
  if (bytes.length < 12) return null;
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return "image/jpeg";
  }
  if (
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47
  ) {
    return "image/png";
  }
  if (
    bytes[0] === 0x52 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x46 &&
    bytes[8] === 0x57 &&
    bytes[9] === 0x45 &&
    bytes[10] === 0x42 &&
    bytes[11] === 0x50
  ) {
    return "image/webp";
  }
  return null;
}
