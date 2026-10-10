/** Undo UTF-8 text that was misread as Latin-1 (â‚¬, Ã—, Ã¤). */
export function repairMojibake(value: string, depth = 0): string {
  if (depth > 2 || !/[\u0080-\u00ff]/.test(value)) return value;
  const bytes = Uint8Array.from(value, (ch) => ch.charCodeAt(0) & 0xff);
  try {
    const decoded = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
    if (decoded === value) return value;
    return repairMojibake(decoded, depth + 1);
  } catch {
    return value;
  }
}

/** Jumpata → Jumpat / jumpata → jumpat, keeping the original capital letter. */
export function replaceJumpata(value: string): string {
  return value.replace(/jumpata/gi, (match) =>
    match[0] === "J" ? "Jumpat" : "jumpat",
  );
}

export function cleanStoredText(value: string): string {
  return replaceJumpata(repairMojibake(value));
}

export function repairJson<T>(value: T): T {
  if (typeof value === "string") return cleanStoredText(value) as T;
  if (Array.isArray(value)) return value.map((item) => repairJson(item)) as T;
  if (value && typeof value === "object") {
    const next: Record<string, unknown> = {};
    for (const [key, item] of Object.entries(value)) {
      next[key] = repairJson(item);
    }
    return next as T;
  }
  return value;
}
