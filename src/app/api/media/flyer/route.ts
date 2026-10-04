import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { getFlyer } from "@/lib/flyer";

export const dynamic = "force-dynamic";

export async function GET() {
  const flyer = await getFlyer();
  if (flyer) {
    const bytes = Buffer.from(flyer.data, "base64");
    return new NextResponse(new Uint8Array(bytes), {
      headers: {
        "Content-Type": flyer.mime,
        "Cache-Control": "public, max-age=60, stale-while-revalidate=600",
      },
    });
  }

  const fallback = await fs.readFile(
    path.join(process.cwd(), "public/images/tarjoukset-flyer.png"),
  );
  return new NextResponse(new Uint8Array(fallback), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=300",
    },
  });
}
