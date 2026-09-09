import Image from "next/image";

export function PromotersLogo({ className }: { className?: string }) {
  return (
    <Image
      src="/promoters-logo.png"
      alt="Promoters — Digital Marketing 360°"
      width={180}
      height={40}
      priority
      className={className}
    />
  );
}
