import type { Answers, Question } from "@/types/questionnaire";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateQuestion(question: Question, answers: Answers): string | undefined {
  const value = answers[question.id];

  if (question.required) {
    const isEmpty =
      value === undefined ||
      value === null ||
      (typeof value === "string" && value.trim().length === 0) ||
      (Array.isArray(value) && value.length === 0);

    if (isEmpty) {
      return "Αυτό το πεδίο είναι απαραίτητο.";
    }
  }

  if (question.type === "email" && typeof value === "string" && value.trim().length > 0) {
    if (!EMAIL_REGEX.test(value.trim())) {
      return "Παρακαλούμε εισάγετε ένα έγκυρο email.";
    }
  }

  if (question.maxSelections && Array.isArray(value) && value.length > question.maxSelections) {
    return `Μπορείτε να επιλέξετε έως ${question.maxSelections} επιλογές.`;
  }

  return undefined;
}

export function validateQuestions(questionsToValidate: Question[], answers: Answers): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const question of questionsToValidate) {
    const error = validateQuestion(question, answers);
    if (error) {
      errors[question.id] = error;
    }
  }
  return errors;
}
