import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import {
  clearFlyer,
  FLYER_MAX_BYTES,
  flyerSrc,
  getFlyer,
  saveFlyer,
  sniffImageMime,
} from "@/lib/flyer";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Ei kirjautunut" }, { status: 401 });
  }

  const flyer = await getFlyer();
  return NextResponse.json({
    custom: Boolean(flyer),
    src: flyerSrc(flyer),
    updatedAt: flyer?.updatedAt ?? null,
  });
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Ei kirjautunut" }, { status: 401 });
  }

  const form = await request.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "Valitse kuvatiedosto" }, { status: 400 });
  }
  if (file.size > FLYER_MAX_BYTES) {
    return NextResponse.json(
      { error: "Kuva on liian suuri. Enimmäiskoko on 3,5 Mt." },
      { status: 400 },
    );
  }

  const bytes = new Uint8Array(await file.arrayBuffer());
  const mime = sniffImageMime(bytes);
  if (!mime) {
    return NextResponse.json(
      { error: "Käytä JPG-, PNG- tai WebP-kuvaa." },
      { status: 400 },
    );
  }

  const saved = await saveFlyer({
    mime,
    data: Buffer.from(bytes).toString("base64"),
    updatedAt: new Date().toISOString(),
  });
  revalidatePath("/tarjoukset");

  return NextResponse.json({
    custom: true,
    src: flyerSrc(saved),
    updatedAt: saved.updatedAt,
  });
}

export async function DELETE() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Ei kirjautunut" }, { status: 401 });
  }

  await clearFlyer();
  revalidatePath("/tarjoukset");

  return NextResponse.json({
    custom: false,
    src: flyerSrc(null),
    updatedAt: null,
  });
}
