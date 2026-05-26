"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
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

  const navigate = (r: SearchResult) => {
    setOpen(false);
    setQuery("");
    if (r.type === "product") {
      router.push(`/shop/${r.categorySlug}/${r.slug}` as "/shop");
    } else {
      router.push(`/services/${r.slug}` as "/services");
    }
  };

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

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="top-[20%] translate-y-0 border-border bg-background p-0 sm:max-w-lg">
          <DialogTitle className="sr-only">{t("search")}</DialogTitle>
          <div className="border-b border-border p-4">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`${t("search")} (Ctrl+K)`}
              className="rounded-none border-0 bg-transparent p-0 font-mono text-sm focus-visible:ring-0"
              autoFocus
            />
          </div>
          <div className="max-h-80 overflow-y-auto">
            {query.length >= 2 && results.length === 0 && (
              <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                {t("no_results")}
              </div>
            )}
            {results.map((r) => (
              <button
                key={`${r.type}-${r.id}`}
                type="button"
                onClick={() => navigate(r)}
                className="flex w-full items-center justify-between px-4 py-3 text-left transition-colors hover:bg-surface"
              >
                <div>
                  <div className="text-sm">{r.name}</div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
                    {r.category}
                  </div>
                </div>
                {r.price > 0 && (
                  <span className="font-mono text-xs text-accent">{formatPrice(r.price)}</span>
                )}
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export { SearchCommand };
