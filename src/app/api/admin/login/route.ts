import { NextResponse } from "next/server";
import { createAdminSession, getAdminPassword } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    password?: string;
  } | null;

  if (!body?.password || body.password !== getAdminPassword()) {
    return NextResponse.json({ error: "Väärä salasana" }, { status: 401 });
  }

  await createAdminSession();
  return NextResponse.json({ ok: true });
}
