import { questions } from "@/data/questions";
import type { Answers, Question } from "@/types/questionnaire";
import { isQuestionVisible } from "@/data/questions";

export function getSections(): string[] {
  const seen = new Set<string>();
  const sections: string[] = [];
  for (const question of questions) {
    if (!seen.has(question.section)) {
      seen.add(question.section);
      sections.push(question.section);
    }
  }
  return sections;
}

export function getVisibleQuestions(answers: Answers): Question[] {
  return questions.filter((question) => isQuestionVisible(question, answers));
}

export function getVisibleQuestionsForSection(section: string, answers: Answers): Question[] {
  return getVisibleQuestions(answers).filter((question) => question.section === section);
}

export function getSectionLabel(section: string): string {
  const [, ...rest] = section.split("·");
  return rest.join("·").trim() || section;
}
