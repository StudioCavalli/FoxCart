import { cn } from "@/lib/utils";
import type React from "react";

type GlassVariant = "subtle" | "medium" | "strong";

interface GlassCardProps extends React.ComponentProps<"div"> {
  variant?: GlassVariant;
  accent?: boolean;
}

const blurMap: Record<GlassVariant, string> = {
  subtle: "backdrop-blur-sm",
  medium: "backdrop-blur-xl",
  strong: "backdrop-blur-2xl",
};

function GlassCard({ variant = "medium", accent = false, className, ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-glass-border bg-glass-bg shadow-[var(--glass-shadow)]",
        "transition-[border-color,box-shadow] duration-[var(--duration-fast)] ease-[var(--ease-default)]",
        "hover:border-accent-muted hover:shadow-[var(--glass-shadow),0_0_24px_rgba(255,107,0,0.08)]",
        blurMap[variant],
        accent && "border-accent/30 shadow-[var(--glass-shadow),0_0_32px_rgba(255,107,0,0.12)]",
        className,
      )}
      {...props}
    />
  );
}

export { GlassCard };
export type { GlassCardProps, GlassVariant };
