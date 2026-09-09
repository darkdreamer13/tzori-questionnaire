"use client";

import { useCallback, useEffect, useState } from "react";
import type { Answers } from "@/types/questionnaire";

const STORAGE_KEY = "tzori-questionnaire:v1";

type StoredState = {
  answers: Answers;
  stepIndex: number;
  updatedAt: string;
};

function readStoredState(): StoredState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StoredState;
  } catch {
    return null;
  }
}

export function useQuestionnaireState() {
  const [answers, setAnswers] = useState<Answers>({});
  const [stepIndex, setStepIndex] = useState(0);
  const [hasRestored, setHasRestored] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const stored = readStoredState();
    if (stored) {
      setAnswers(stored.answers ?? {});
      setStepIndex(stored.stepIndex ?? 0);
      setHasRestored(true);
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    const payload: StoredState = {
      answers,
      stepIndex,
      updatedAt: new Date().toISOString()
    };
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // Αγνοούμε σφάλματα αποθήκευσης (π.χ. private browsing).
    }
  }, [answers, stepIndex, isHydrated]);

  const updateAnswer = useCallback((questionId: string, value: Answers[string]) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  }, []);

  const clearStoredState = useCallback(() => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // no-op
    }
    setAnswers({});
    setStepIndex(0);
  }, []);

  return {
    answers,
    setAnswers,
    stepIndex,
    setStepIndex,
    updateAnswer,
    hasRestored,
    dismissRestoredNotice: () => setHasRestored(false),
    clearStoredState,
    isHydrated
  };
}
