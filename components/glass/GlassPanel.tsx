import { cn } from "@/lib/utils";
import type React from "react";

interface GlassPanelProps extends React.ComponentProps<"div"> {
  variant?: "subtle" | "medium" | "strong";
}

const blurMap = {
  subtle: "backdrop-blur-sm",
  medium: "backdrop-blur-xl",
  strong: "backdrop-blur-2xl",
};

function GlassPanel({ variant = "medium", className, ...props }: GlassPanelProps) {
  return (
    <div
      className={cn(
        "border border-glass-border bg-glass-bg shadow-[var(--glass-shadow)]",
        blurMap[variant],
        className,
      )}
      {...props}
    />
  );
}

export { GlassPanel };
