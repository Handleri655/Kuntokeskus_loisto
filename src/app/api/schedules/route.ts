import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import {
  getSchedules,
  isSchedulesData,
  saveSchedules,
} from "@/lib/schedules";

export async function GET() {
  const schedules = await getSchedules();
  return NextResponse.json(schedules);
}

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Ei kirjautunut" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (!isSchedulesData(body)) {
    return NextResponse.json({ error: "Virheellinen data" }, { status: 400 });
  }

  const saved = await saveSchedules(body);
  revalidatePath("/ryhmaliikunta");
  revalidatePath("/ryhmaliikunta/kesa");
  revalidatePath("/");

  return NextResponse.json(saved);
}
