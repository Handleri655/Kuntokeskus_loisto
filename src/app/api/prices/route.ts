import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getPrices, isPricesData, savePrices } from "@/lib/prices";

export async function GET() {
  const prices = await getPrices();
  return NextResponse.json(prices);
}

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Ei kirjautunut" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (!isPricesData(body)) {
    return NextResponse.json({ error: "Virheellinen data" }, { status: 400 });
  }

  const saved = await savePrices(body);
  revalidatePath("/");
  revalidatePath("/hinnat");
  revalidatePath("/tarjoukset");
  revalidatePath("/personal-training");
  revalidatePath("/painonpudotus");

  return NextResponse.json(saved);
}
