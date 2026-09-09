export type AnswerValue = string | string[];
export type Answers = Record<string, AnswerValue>;

export type Condition = {
  questionId: string;
  equals?: string;
  oneOf?: string[];
  notEquals?: string;
};

export type QuestionType =
  | "text"
  | "email"
  | "tel"
  | "url"
  | "number"
  | "date"
  | "textarea"
  | "single"
  | "multi"
  | "file";

export type Question = {
  id: string;
  section: string;
  title: string;
  description?: string;
  type: QuestionType;
  required?: boolean;
  placeholder?: string;
  options?: string[];
  maxSelections?: number;
  condition?: Condition;
  accept?: string;
  multiple?: boolean;
  uploadTarget?: "root" | "images";
};
