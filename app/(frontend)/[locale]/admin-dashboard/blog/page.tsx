"use client";

import { AdminShell } from "@/components/layout/AdminShell";
import { Input } from "@/components/ui/input";
import { SectionHeader } from "@/components/visual";
import { Link } from "@/i18n/navigation";
import { FileText, Plus, Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface BlogPost {
  id: string;
  title: string;
  author: string;
  tags?: { tag: string }[];
  publishedAt: string | null;
  _status: "draft" | "published";
}

export default function AdminBlogPage() {
  const t = useTranslations("Admin");
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    fetch("/api/admin/blog")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => setPosts(d?.docs ?? []))
      .catch(() => {});
  }, []);

  return (
    <AdminShell>
      <div className="border-b border-border px-8 py-12 md:px-16">
        <SectionHeader number="00" label={t("blog.title")} className="mb-4" />
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">{t("blog.title")}</h1>
          <Link
            href="/admin-dashboard/blog/create"
            className="flex items-center gap-2 bg-accent px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.15em] text-accent-foreground transition-colors hover:bg-accent-hover"
          >
            <Plus className="h-3.5 w-3.5" strokeWidth={2} />
            {t("blog.create")}
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-4 border-b border-border px-8 py-3 md:px-16">
        <div className="relative flex-1 max-w-sm">
          <Input
            placeholder={t("common.search")}
            className="rounded-none border-border pl-9 font-mono text-xs"
          />
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
        </div>
      </div>

      <div className="px-8 py-6 md:px-16">
        {posts.length === 0 ? (
          <div className="border border-border p-16 text-center">
            <FileText className="mx-auto h-10 w-10 text-muted-foreground/20" strokeWidth={1} />
            <p className="mt-4 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
              {t("common.no_results")}
            </p>
          </div>
        ) : (
          <div className="border border-border">
            <div className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 border-b border-border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
              <span>{t("blog.post_title")}</span>
              <span>{t("blog.author")}</span>
              <span>{t("blog.tags")}</span>
              <span>{t("blog.status")}</span>
              <span>{t("blog.date")}</span>
            </div>
            {posts.map((p) => (
              <div
                key={p.id}
                className="grid grid-cols-[1fr_auto_auto_auto_auto] items-center gap-4 border-b border-border px-4 py-3 last:border-0 transition-colors hover:bg-surface"
              >
                <span className="text-sm font-medium">{p.title}</span>
                <span className="font-mono text-xs text-muted-foreground">{p.author}</span>
                <span className="font-mono text-[10px] text-muted-foreground">
                  {p.tags?.map((t) => t.tag).join(", ") || "---"}
                </span>
                <span
                  className={`font-mono text-[10px] uppercase tracking-[0.1em] ${
                    p._status === "published" ? "text-accent" : "text-muted-foreground"
                  }`}
                >
                  {p._status}
                </span>
                <span className="font-mono text-[10px] text-muted-foreground">
                  {p.publishedAt ? new Date(p.publishedAt).toLocaleDateString("fr-FR") : "---"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminShell>
  );
}
