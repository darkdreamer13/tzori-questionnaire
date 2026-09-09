"use client";

import { useMemo, useState } from "react";
import { PromotersLogo } from "@/components/promoters-logo";
import { QuestionnaireProgress } from "@/components/questionnaire-progress";
import { QuestionField } from "@/components/question-field";
import { SubmissionSuccess } from "@/components/submission-success";
import { useQuestionnaireState } from "@/hooks/use-questionnaire-state";
import { getSections, getVisibleQuestions, getVisibleQuestionsForSection } from "@/lib/sections";
import { validateQuestions } from "@/lib/validation";
import type { AnswerValue } from "@/types/questionnaire";

const sections = getSections();

export function QuestionnaireForm() {
  const { answers, updateAnswer, stepIndex, setStepIndex, hasRestored, dismissRestoredNotice, clearStoredState, isHydrated } =
    useQuestionnaireState();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitStatus, setSubmitStatus] = useState<"idle" | "submitting" | "error" | "success">("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const currentSectionIndex = Math.min(stepIndex, sections.length - 1);
  const currentSection = sections[currentSectionIndex];

  const visibleQuestionsInSection = useMemo(
    () => getVisibleQuestionsForSection(currentSection, answers),
    [currentSection, answers]
  );

  const totalVisibleQuestions = useMemo(() => getVisibleQuestions(answers).length, [answers]);

  const questionsAnsweredSoFar = useMemo(() => {
    let count = 0;
    for (let i = 0; i < currentSectionIndex; i++) {
      count += getVisibleQuestionsForSection(sections[i], answers).length;
    }
    return count;
  }, [currentSectionIndex, answers]);

  const isLastSection = currentSectionIndex === sections.length - 1;

  function handleAnswerChange(questionId: string, value: AnswerValue) {
    updateAnswer(questionId, value);
    if (errors[questionId]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[questionId];
        return next;
      });
    }
  }

  function goToNextSection() {
    const sectionErrors = validateQuestions(visibleQuestionsInSection, answers);
    if (Object.keys(sectionErrors).length > 0) {
      setErrors(sectionErrors);
      const firstErrorId = Object.keys(sectionErrors)[0];
      document
        .querySelector(`[data-question-id="${firstErrorId}"]`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setErrors({});
    if (isLastSection) {
      handleSubmit();
      return;
    }
    setStepIndex(currentSectionIndex + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goToPreviousSection() {
    if (currentSectionIndex === 0) return;
    setErrors({});
    setStepIndex(currentSectionIndex - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit() {
    setSubmitStatus("submitting");
    setSubmitError(null);
    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers })
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.error ?? "Η αποστολή απέτυχε. Δοκιμάστε ξανά.");
      }

      clearStoredState();
      setSubmitStatus("success");
    } catch (error) {
      setSubmitStatus("error");
      setSubmitError(error instanceof Error ? error.message : "Κάτι πήγε στραβά. Δοκιμάστε ξανά.");
    }
  }

  if (submitStatus === "success") {
    return <SubmissionSuccess />;
  }

  if (!isHydrated) {
    return null;
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-6 py-10 md:py-16">
      <header className="mb-10 flex items-center justify-between">
        <PromotersLogo className="h-8 w-auto md:h-9" />
      </header>

      {hasRestored ? (
        <div className="mb-8 flex items-center justify-between gap-4 rounded-lg border border-primary/30 bg-primary/5 px-4 py-3">
          <p className="text-sm leading-relaxed text-foreground">
            Συνεχίζετε από εκεί που είχατε σταματήσει.
          </p>
          <button
            type="button"
            onClick={dismissRestoredNotice}
            className="shrink-0 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Κλείσιμο
          </button>
        </div>
      ) : null}

      <div className="mb-10">
        <QuestionnaireProgress
          sections={sections}
          currentSectionIndex={currentSectionIndex}
          currentStep={questionsAnsweredSoFar}
          totalSteps={totalVisibleQuestions}
        />
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          goToNextSection();
        }}
        noValidate
        className="flex flex-1 flex-col"
      >
        <div className="flex flex-1 flex-col gap-12">
          {visibleQuestionsInSection.map((question) => (
            <QuestionField
              key={question.id}
              question={question}
              value={answers[question.id]}
              onChange={(value) => handleAnswerChange(question.id, value)}
              error={errors[question.id]}
            />
          ))}
        </div>

        {submitStatus === "error" && submitError ? (
          <p role="alert" className="mt-8 text-sm font-medium text-destructive">
            {submitError}
          </p>
        ) : null}

        <div className="mt-12 flex items-center justify-between gap-4 border-t border-border pt-6">
          <button
            type="button"
            onClick={goToPreviousSection}
            disabled={currentSectionIndex === 0 || submitStatus === "submitting"}
            className="rounded-lg px-5 py-3 text-base font-semibold text-muted-foreground transition-colors hover:text-foreground disabled:opacity-0"
          >
            Πίσω
          </button>

          <button
            type="submit"
            disabled={submitStatus === "submitting"}
            className="brand-gradient rounded-lg px-8 py-3 font-heading text-base font-bold text-white shadow-sm transition-transform hover:scale-[1.02] focus:outline-none focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-70"
          >
            {submitStatus === "submitting" ? "Αποστολή..." : isLastSection ? "Υποβολή απαντήσεων" : "Επόμενο"}
          </button>
        </div>
      </form>

      <p className="mt-10 text-center text-sm leading-relaxed text-muted-foreground">
        Οι απαντήσεις σας αποθηκεύονται αυτόματα σε αυτή τη συσκευή, ώστε να μπορείτε να συνεχίσετε αργότερα.
      </p>
    </div>
  );
}
