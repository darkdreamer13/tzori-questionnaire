"use client";

import { useId } from "react";
import type { AnswerValue, Question } from "@/types/questionnaire";
import { FileUploadField } from "@/components/file-upload-field";

type QuestionFieldProps = {
  question: Question;
  value: AnswerValue | undefined;
  onChange: (value: AnswerValue) => void;
  error?: string;
};

const baseInputClasses =
  "w-full rounded-lg border border-input bg-card px-4 py-3 text-base text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary focus:outline-none focus:ring-3 focus:ring-primary/20";

export function QuestionField({ question, value, onChange, error }: QuestionFieldProps) {
  const inputId = useId();
  const descriptionId = question.description ? `${inputId}-description` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy = [descriptionId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <fieldset className="w-full" data-question-id={question.id}>
      <legend className="sr-only">{question.title}</legend>

      <label htmlFor={inputId} className="mb-1 block font-heading text-2xl font-bold leading-snug text-foreground text-balance md:text-3xl">
        {question.title}
        {question.required ? (
          <span className="ml-1 text-primary" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="ml-2 align-middle text-sm font-normal text-muted-foreground">(προαιρετικό)</span>
        )}
      </label>

      {question.description ? (
        <p id={descriptionId} className="mb-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {question.description}
        </p>
      ) : (
        <div className="mb-5" />
      )}

      <div className="max-w-2xl">
        {renderInput({ question, value, onChange, inputId, describedBy })}
      </div>

      {error ? (
        <p id={errorId} role="alert" className="mt-3 text-sm font-medium text-destructive">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}

function renderInput({
  question,
  value,
  onChange,
  inputId,
  describedBy
}: {
  question: Question;
  value: AnswerValue | undefined;
  onChange: (value: AnswerValue) => void;
  inputId: string;
  describedBy?: string;
}) {
  switch (question.type) {
    case "text":
    case "email":
    case "tel":
    case "url":
    case "number":
    case "date": {
      const stringValue = typeof value === "string" ? value : "";
      return (
        <input
          id={inputId}
          type={question.type}
          value={stringValue}
          onChange={(event) => onChange(event.target.value)}
          placeholder={question.placeholder}
          required={question.required}
          aria-describedby={describedBy}
          className={baseInputClasses}
          autoComplete="off"
        />
      );
    }

    case "textarea": {
      const stringValue = typeof value === "string" ? value : "";
      return (
        <textarea
          id={inputId}
          value={stringValue}
          onChange={(event) => onChange(event.target.value)}
          placeholder={question.placeholder}
          required={question.required}
          aria-describedby={describedBy}
          rows={5}
          className={`${baseInputClasses} resize-y leading-relaxed`}
        />
      );
    }

    case "single": {
      const stringValue = typeof value === "string" ? value : "";
      return (
        <div role="radiogroup" aria-describedby={describedBy} className="flex flex-col gap-3">
          {question.options?.map((option) => {
            const checked = stringValue === option;
            return (
              <label
                key={option}
                className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-base leading-relaxed transition-colors ${
                  checked
                    ? "border-primary bg-primary/5 text-foreground"
                    : "border-input bg-card text-foreground hover:border-primary/40"
                }`}
              >
                <input
                  type="radio"
                  name={inputId}
                  value={option}
                  checked={checked}
                  onChange={() => onChange(option)}
                  className="h-4 w-4 accent-[var(--color-primary)]"
                />
                <span>{option}</span>
              </label>
            );
          })}
        </div>
      );
    }

    case "multi": {
      const arrayValue = Array.isArray(value) ? value : [];
      return (
        <div aria-describedby={describedBy} className="flex flex-col gap-3">
          {question.options?.map((option) => {
            const checked = arrayValue.includes(option);
            return (
              <label
                key={option}
                className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-base leading-relaxed transition-colors ${
                  checked
                    ? "border-primary bg-primary/5 text-foreground"
                    : "border-input bg-card text-foreground hover:border-primary/40"
                }`}
              >
                <input
                  type="checkbox"
                  value={option}
                  checked={checked}
                  onChange={() => {
                    const next = checked ? arrayValue.filter((item) => item !== option) : [...arrayValue, option];
                    onChange(next);
                  }}
                  className="h-4 w-4 rounded accent-[var(--color-primary)]"
                />
                <span>{option}</span>
              </label>
            );
          })}
        </div>
      );
    }

    case "file": {
      const arrayValue = Array.isArray(value) ? value : [];
      return (
        <FileUploadField
          question={question}
          uploadedFiles={arrayValue}
          onChange={onChange}
          inputId={inputId}
          describedBy={describedBy}
        />
      );
    }

    default:
      return null;
  }
}
