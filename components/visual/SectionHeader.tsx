import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  number: string;
  label: string;
  meta?: string;
  className?: string;
}

function SectionHeader({ number, label, meta, className }: SectionHeaderProps) {
  return (
    <div className={cn("flex items-baseline gap-3", className)}>
      <span className="font-mono text-xs tracking-widest text-accent">{number}</span>
      <span className="font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      {meta && (
        <>
          <span className="text-muted-foreground/30">—</span>
          <span className="font-mono text-xs text-muted-foreground/60">{meta}</span>
        </>
      )}
    </div>
  );
}

export { SectionHeader };
