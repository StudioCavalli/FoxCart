import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

function Marquee({ children, speed = 30, className }: MarqueeProps) {
  return (
    <div className={cn("group flex overflow-hidden select-none", className)} aria-hidden="true">
      <div
        className="flex shrink-0 items-center gap-8 motion-safe:animate-[marquee-scroll_var(--speed)_linear_infinite] group-hover:[animation-play-state:paused]"
        style={{ "--speed": `${speed}s` } as React.CSSProperties}
      >
        {children}
      </div>
      <div
        className="flex shrink-0 items-center gap-8 motion-safe:animate-[marquee-scroll_var(--speed)_linear_infinite] group-hover:[animation-play-state:paused]"
        style={{ "--speed": `${speed}s` } as React.CSSProperties}
      >
        {children}
      </div>
    </div>
  );
}

export { Marquee };
