import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 4 * 1024 * 1024;

function sanitizeFileName(name: string): string {
  return name.replace(/[/\\?%*:|"<>]/g, "-").slice(0, 180);
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const questionId = formData.get("questionId");
    const uploadTargetRaw = formData.get("uploadTarget");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Δεν βρέθηκε αρχείο." }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "Το αρχείο ξεπερνά το όριο των 4 MB." }, { status: 413 });
    }

    const uploadTarget = uploadTargetRaw === "images" ? "images" : "root";
    const prefix = typeof questionId === "string" && questionId.length > 0 ? `${questionId}_` : "";
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const safeName = sanitizeFileName(file.name || "upload");
    const fileName = `${prefix}${timestamp}_${safeName}`;
    const pathname = `questionnaire/${uploadTarget}/${fileName}`;

    const blob = await put(pathname, file, {
      access: "public",
      contentType: file.type || "application/octet-stream"
    });

    return NextResponse.json({ fileName: safeName, url: blob.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[v0] Upload error:", message);
    return NextResponse.json({ error: "Το αρχείο δεν ανέβηκε. Δοκιμάστε ξανά." }, { status: 500 });
  }
}
