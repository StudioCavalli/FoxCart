import { cn } from "@/lib/utils";

interface PatternProps {
  seed?: string;
  variant?: "halftone";
  className?: string;
}

function hash(seed: string): number {
  let h = 5381;
  for (let i = 0; i < seed.length; i++) h = (h * 33) ^ seed.charCodeAt(i);
  return h >>> 0;
}

function Pattern({ seed = "foxcase", className }: PatternProps) {
  const h = hash(seed);
  const cells = 14;
  const step = 200 / cells;

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden="true">
      <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
        <title>Decorative pattern</title>
        <g fill="currentColor">
          {Array.from({ length: cells * cells }, (_, i) => {
            const x = (i % cells) * step + step / 2;
            const y = Math.floor(i / cells) * step + step / 2;
            const dx = (x - 100) / 100;
            const dy = (y - 100) / 100;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const r = Math.max(0.4, (1 - dist) * (step / 2.4) + ((h >> (i % 16)) & 1));
            return <circle key={i} cx={x} cy={y} r={r > 0 ? r : 0.5} />;
          })}
        </g>
      </svg>
    </div>
  );
}

export { Pattern };
