import { getSectionLabel } from "@/lib/sections";

type QuestionnaireProgressProps = {
  sections: string[];
  currentSectionIndex: number;
  currentStep: number;
  totalSteps: number;
};

export function QuestionnaireProgress({
  sections,
  currentSectionIndex,
  currentStep,
  totalSteps
}: QuestionnaireProgressProps) {
  const percent = totalSteps > 0 ? Math.round((currentStep / totalSteps) * 100) : 0;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-medium text-muted-foreground">
          Βήμα {currentSectionIndex + 1} από {sections.length}
        </span>
        <span className="text-sm font-medium text-muted-foreground">{percent}%</span>
      </div>
      <div
        className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Πρόοδος ερωτηματολογίου"
      >
        <div
          className="brand-gradient h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="mt-3 font-heading text-lg font-bold text-foreground text-balance">
        {getSectionLabel(sections[currentSectionIndex] ?? "")}
      </p>
    </div>
  );
}
