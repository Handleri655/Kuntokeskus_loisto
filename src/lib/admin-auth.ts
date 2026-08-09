import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "loisto_admin";
const MAX_AGE_SECONDS = 60 * 60 * 12;

function getSecret() {
  return (
    process.env.ADMIN_SECRET ||
    process.env.ADMIN_PASSWORD ||
    "vaihda-tama-salainen-avain"
  );
}

function sign(value: string) {
  return createHmac("sha256", getSecret()).update(value).digest("hex");
}

export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || "loisto2026";
}

export async function createAdminSession() {
  const expires = String(Date.now() + MAX_AGE_SECONDS * 1000);
  const token = `${expires}.${sign(expires)}`;
  const jar = await cookies();
  jar.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  });
}

export async function clearAdminSession() {
  const jar = await cookies();
  jar.delete(COOKIE_NAME);
}

export async function isAdminAuthenticated() {
  const jar = await cookies();
  const token = jar.get(COOKIE_NAME)?.value;
  if (!token) return false;

  const [expires, signature] = token.split(".");
  if (!expires || !signature) return false;

  const expected = sign(expires);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;

  return Number(expires) > Date.now();
}
