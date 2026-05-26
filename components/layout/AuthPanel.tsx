import { Link } from "@/i18n/navigation";
import Image from "next/image";

interface AuthPanelProps {
  title: string;
  subtitle: string;
}

function AuthPanel({ title, subtitle }: AuthPanelProps) {
  return (
    <div className="relative hidden w-1/2 items-end overflow-hidden border-r border-border lg:flex">
      <Image src="/auth-bg.jpg" alt="" fill className="object-cover" priority />
      <div className="absolute inset-0 bg-background/85" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

      <div className="relative px-16 pb-16">
        <Link
          href="/"
          className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-foreground"
        >
          FoxCase
        </Link>
        <h2 className="mt-6 max-w-md text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[0.95] tracking-[-0.03em]">
          {title}
          <span className="text-accent">.</span>
        </h2>
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">{subtitle}</p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 border-t border-border/50 px-16 py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60">
        45 Bd de la Croisette, Cannes
      </div>
    </div>
  );
}

export { AuthPanel };
