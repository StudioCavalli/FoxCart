"use client";

import { cn } from "@/lib/utils";
import type React from "react";

interface GlassModalProps extends React.ComponentProps<"div"> {
  open?: boolean;
  onClose?: () => void;
}

function GlassModal({ open = false, onClose, className, children, ...props }: GlassModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        onKeyDown={(e) => e.key === "Escape" && onClose?.()}
        role="button"
        tabIndex={-1}
        aria-label="Close modal"
      />
      <div
        className={cn(
          "relative z-10 w-full max-w-lg rounded-xl border border-glass-border bg-glass-bg shadow-[var(--glass-shadow)]",
          "backdrop-blur-2xl p-6",
          "animate-[scale-in_300ms_var(--ease-reveal)]",
          className,
        )}
        role="dialog"
        aria-modal="true"
        {...props}
      >
        {children}
      </div>
    </div>
  );
}

export { GlassModal };
