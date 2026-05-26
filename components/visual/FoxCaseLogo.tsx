import { cn } from "@/lib/utils";

interface FoxCaseLogoProps {
  className?: string;
  size?: number;
}

function FoxCaseLogo({ className, size = 32 }: FoxCaseLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-current", className)}
      role="img"
      aria-label="FoxCase"
    >
      <title>FoxCase</title>
      <path
        d="M4 6L10 2L16 8L22 2L28 6V14L22 20H10L4 14V6Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Eyes */}
      <circle cx="12" cy="11" r="1.5" fill="currentColor" />
      <circle cx="20" cy="11" r="1.5" fill="currentColor" />
      {/* Nose / snout */}
      <path
        d="M14 16L16 18L18 16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Jaw */}
      <path d="M10 20L16 26L22 20" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

export { FoxCaseLogo };
