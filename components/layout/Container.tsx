import { cn } from "@/lib/utils";
import type React from "react";

interface ContainerProps extends React.ComponentProps<"div"> {
  bleed?: boolean;
}

function Container({ bleed = false, className, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[var(--grid-max)]",
        !bleed && "px-[var(--grid-margin)]",
        className,
      )}
      {...props}
    />
  );
}

export { Container };
