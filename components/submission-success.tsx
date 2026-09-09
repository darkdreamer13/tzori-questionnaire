import { PromotersLogo } from "@/components/promoters-logo";

export function SubmissionSuccess() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-16 text-center">
      <PromotersLogo className="mb-10 h-10 w-auto" />
      <div className="brand-gradient mb-6 flex h-16 w-16 items-center justify-center rounded-full">
        <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8 text-white" aria-hidden="true">
          <path
            d="M5 13l4 4L19 7"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h1 className="max-w-xl font-heading text-3xl font-bold text-foreground text-balance md:text-4xl">
        Ευχαριστούμε για τον χρόνο σας
      </h1>
      <p className="mt-4 max-w-lg text-balance text-lg leading-relaxed text-muted-foreground">
        Λάβαμε τις απαντήσεις σας και θα τις μελετήσουμε προσεκτικά. Η ομάδα της Promoters θα επικοινωνήσει μαζί
        σας για τα επόμενα βήματα της Brand Strategy.
      </p>
    </div>
  );
}
