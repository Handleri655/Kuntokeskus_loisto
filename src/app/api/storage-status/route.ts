import { NextResponse } from "next/server";
import { getStorageMode, hasCloudStorage } from "@/lib/storage";

export async function GET() {
  return NextResponse.json({
    mode: getStorageMode(),
    cloud: hasCloudStorage(),
  });
}
