"use client";

import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useRouter } from "@/i18n/navigation";
import { formatPrice } from "@/lib/utils";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";

interface SearchResult {
  id: string;
  slug: string;
  name: string;
  price: number;
  category: string;
  categorySlug: string;
  type: "product" | "service";
}

function SearchCommand() {
  const t = useTranslations("Common");
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const search = useCallback(async (q: string) => {
    if (q.length < 2) {
      setResults([]);
      return;
    }
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      if (res.ok) {
        const data = await res.json();
        setResults(data.results ?? []);
      }
    } catch {
      setResults([]);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => search(query), 300);
    return () => clearTimeout(timer);
  }, [query, search]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-9 w-9 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
        aria-label={t("search")}
      >
        <Search className="h-4 w-4" strokeWidth={1.5} />
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder={t("search")} value={query} onValueChange={setQuery} />
        <CommandList>
          <CommandEmpty>{t("no_results")}</CommandEmpty>
          {results.map((r) => (
            <CommandItem
              key={`${r.type}-${r.id}`}
              onSelect={() => {
                setOpen(false);
                if (r.type === "product") {
                  router.push(`/shop/${r.categorySlug}/${r.slug}` as "/shop");
                } else {
                  router.push(`/services/${r.slug}` as "/services");
                }
              }}
            >
              <div className="flex w-full items-center justify-between">
                <div>
                  <div className="text-sm">{r.name}</div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
                    {r.category}
                  </div>
                </div>
                {r.price > 0 && (
                  <span className="font-mono text-xs text-accent">{formatPrice(r.price)}</span>
                )}
              </div>
            </CommandItem>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}

export { SearchCommand };
