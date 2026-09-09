import { NextResponse } from "next/server";
import { Resend } from "resend";
import { questions } from "@/data/questions";
import { buildSubmissionEmailHtml } from "@/lib/email-template";
import { getVisibleQuestions } from "@/lib/sections";
import { validateQuestions } from "@/lib/validation";
import type { Answers } from "@/types/questionnaire";

export const runtime = "nodejs";

function isAnswers(value: unknown): value is Answers {
  if (typeof value !== "object" || value === null) return false;
  return Object.values(value).every(
    (item) => typeof item === "string" || (Array.isArray(item) && item.every((entry) => typeof entry === "string"))
  );
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    const answers = body?.answers;

    if (!isAnswers(answers)) {
      return NextResponse.json({ error: "Μη έγκυρα δεδομένα φόρμας." }, { status: 400 });
    }

    const visibleQuestions = getVisibleQuestions(answers);
    const errors = validateQuestions(visibleQuestions, answers);

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { error: "Λείπουν υποχρεωτικά πεδία. Επιστρέψτε στη φόρμα και ελέγξτε τις απαντήσεις σας." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.FORM_FROM_EMAIL;
    const toEmail = process.env.FORM_TO_EMAIL;

    if (!apiKey || !fromEmail || !toEmail) {
      console.error("[v0] Missing Resend configuration env vars");
      return NextResponse.json({ error: "Η αποστολή email δεν είναι ρυθμισμένη." }, { status: 500 });
    }

    const resend = new Resend(apiKey);
    const html = buildSubmissionEmailHtml(answers);
    const contactName = typeof answers["contact_name"] === "string" ? answers["contact_name"] : "";

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: contactName
        ? `Νέο ερωτηματολόγιο έναρξης — ${contactName}`
        : "Νέο ερωτηματολόγιο έναρξης — Ελαιόλαδο",
      html
    });

    if (error) {
      console.error("[v0] Resend send error:", error);
      return NextResponse.json({ error: "Η αποστολή email απέτυχε." }, { status: 502 });
    }

    return NextResponse.json({ success: true, totalQuestions: questions.length });
  } catch (error) {
    console.error("[v0] Submit error:", error);
    return NextResponse.json({ error: "Κάτι πήγε στραβά. Δοκιμάστε ξανά." }, { status: 500 });
  }
}
