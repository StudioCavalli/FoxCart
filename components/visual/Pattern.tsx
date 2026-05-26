import { cn } from "@/lib/utils";

interface PatternProps {
  className?: string;
  opacity?: number;
}

function Pattern({ className, opacity = 0.04 }: PatternProps) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0", className)}
      style={{ opacity }}
      aria-hidden="true"
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <pattern id="foxcart-grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#foxcart-grid)" className="text-accent" />
      </svg>
    </div>
  );
}

export { Pattern };
