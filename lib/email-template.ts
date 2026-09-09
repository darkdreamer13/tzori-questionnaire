import { questions } from "@/data/questions";
import { getSectionLabel, getSections, getVisibleQuestions } from "@/lib/sections";
import type { Answers } from "@/types/questionnaire";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatAnswer(value: Answers[string] | undefined): string {
  if (value === undefined || value === null) return "<em>Δεν απαντήθηκε</em>";
  if (Array.isArray(value)) {
    if (value.length === 0) return "<em>Δεν απαντήθηκε</em>";
    return value.map((item) => escapeHtml(item)).join(", ");
  }
  const trimmed = value.trim();
  if (trimmed.length === 0) return "<em>Δεν απαντήθηκε</em>";
  return escapeHtml(trimmed).replace(/\n/g, "<br />");
}

export function buildSubmissionEmailHtml(answers: Answers): string {
  const sections = getSections();
  const visibleQuestions = getVisibleQuestions(answers);
  const visibleIds = new Set(visibleQuestions.map((q) => q.id));

  const sectionsHtml = sections
    .map((section) => {
      const sectionQuestions = questions.filter((q) => q.section === section && visibleIds.has(q.id));
      if (sectionQuestions.length === 0) return "";

      const rows = sectionQuestions
        .map(
          (question) => `
            <tr>
              <td style="padding:14px 0;border-bottom:1px solid #e6e1e8;">
                <p style="margin:0 0 6px;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;color:#231f20;">
                  ${escapeHtml(question.title)}
                </p>
                <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.5;color:#4b4b4b;">
                  ${formatAnswer(answers[question.id])}
                </p>
              </td>
            </tr>`
        )
        .join("");

      return `
        <tr>
          <td style="padding:24px 0 8px;">
            <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:700;color:#e03c8a;text-transform:uppercase;letter-spacing:0.04em;">
              ${escapeHtml(getSectionLabel(section))}
            </p>
          </td>
        </tr>
        <tr>
          <td>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              ${rows}
            </table>
          </td>
        </tr>`;
    })
    .join("");

  return `
    <div style="background-color:#fafafa;padding:32px 16px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background-color:#ffffff;border-radius:12px;overflow:hidden;">
        <tr>
          <td style="padding:32px 32px 8px;">
            <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:20px;font-weight:700;color:#231f20;">
              Νέο ερωτηματολόγιο έναρξης
            </p>
            <p style="margin:6px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#4b4b4b;">
              Νέα σειρά ελαιολάδου — Brand Strategy onboarding
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding:0 32px 8px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              ${sectionsHtml}
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:24px 32px 32px;border-top:1px solid #e6e1e8;">
            <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#8c8c8c;">
              Υποβλήθηκε στις ${new Date().toLocaleString("el-GR", { timeZone: "Europe/Athens" })}
            </p>
          </td>
        </tr>
      </table>
    </div>`;
}
