"use client";

import { AdminShell } from "@/components/layout/AdminShell";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SectionHeader } from "@/components/visual";
import { slugify } from "@/lib/utils";
import { ArrowRight, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function CreateBlogPage() {
  const t = useTranslations("Admin");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [lead, setLead] = useState("");
  const [author, setAuthor] = useState("Christopher Cavalli");
  const [tags, setTags] = useState("");
  const [publish, setPublish] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/admin/blog/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          slug: slug || slugify(title),
          lead,
          author,
          tags: tags.split(",").map((t) => ({ tag: t.trim() })).filter((t) => t.tag),
          publish,
        }),
      });
      if (res.ok) setSuccess(true);
    } catch {}
    finally { setLoading(false); }
  };

  return (
    <AdminShell>
      <div className="border-b border-border px-8 py-12 md:px-16">
        <SectionHeader number="00" label={t("blog.create")} className="mb-4" />
        <h1 className="text-2xl font-bold tracking-tight">{t("blog.create")}</h1>
      </div>

      {success ? (
        <div className="p-16 text-center">
          <p className="text-lg font-medium">Article créé avec succès</p>
          <button type="button" onClick={() => { setSuccess(false); setTitle(""); setSlug(""); setLead(""); }}
            className="mt-6 bg-accent px-6 py-3 font-mono text-[11px] uppercase tracking-[0.15em] text-accent-foreground">
            {t("blog.create")}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-8 md:p-16">
          <div className="max-w-2xl space-y-6">
            <div>
              <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">{t("blog.post_title")}</label>
              <Input value={title} onChange={(e) => { setTitle(e.target.value); if (!slug) setSlug(slugify(e.target.value)); }} required className="rounded-none border-border" />
            </div>
            <div>
              <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Slug</label>
              <Input value={slug || slugify(title)} onChange={(e) => setSlug(e.target.value)} className="rounded-none border-border font-mono text-xs" />
            </div>
            <div>
              <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Chapô</label>
              <Textarea value={lead} onChange={(e) => setLead(e.target.value)} rows={3} maxLength={280} className="rounded-none border-border" />
            </div>
            <div>
              <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">{t("blog.author")}</label>
              <Input value={author} onChange={(e) => setAuthor(e.target.value)} className="rounded-none border-border" />
            </div>
            <div>
              <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">{t("blog.tags")} (séparés par des virgules)</label>
              <Input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="tech, web, design" className="rounded-none border-border" />
            </div>
            <label className="flex items-center gap-3">
              <input type="checkbox" checked={publish} onChange={(e) => setPublish(e.target.checked)} className="accent-accent" />
              <span className="font-mono text-[11px] uppercase tracking-[0.1em]">Publier immédiatement</span>
            </label>

            <button type="submit" disabled={loading}
              className="group flex items-center gap-2 bg-accent px-8 py-4 font-mono text-[11px] uppercase tracking-[0.15em] text-accent-foreground transition-colors hover:bg-accent-hover">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {t("blog.create")}
              {!loading && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
            </button>
          </div>
        </form>
      )}
    </AdminShell>
  );
}
