"use client";

import { AccountShell } from "@/components/layout/AccountShell";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SectionHeader } from "@/components/visual";
import { formatPrice } from "@/lib/utils";
import {
  ArrowRight,
  Check,
  Clock,
  Download,
  Eye,
  FileText,
  Image,
  MessageSquare,
  RotateCcw,
  Video,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface Deliverable {
  id: string | number;
  title: string;
  type: string;
  status: string;
  description?: string;
  dueDate?: string;
  deliveredAt?: string;
  previewUrl?: string;
  clientFeedback?: string;
  priority: string;
  files?: { file: { url?: string; filename?: string } | string }[];
}

interface Subscription {
  plan: string;
  status: string;
  monthlyPrice: number;
  startDate: string;
  nextBillingDate?: string;
}

const statusStyle: Record<string, { color: string; label: string }> = {
  draft: { color: "text-muted-foreground bg-muted/50", label: "Brouillon" },
  in_progress: { color: "text-info bg-info/10", label: "En cours" },
  review: { color: "text-warning bg-warning/10", label: "A valider" },
  approved: { color: "text-success bg-success/10", label: "Approuve" },
  revision_requested: { color: "text-destructive bg-destructive/10", label: "Revision" },
  delivered: { color: "text-accent bg-accent/10", label: "Livre" },
};

const typeIcons: Record<
  string,
  React.ComponentType<{ className?: string; strokeWidth?: number }>
> = {
  visual: Image,
  video: Video,
  report: FileText,
  media_kit: FileText,
  post: MessageSquare,
  newsletter: FileText,
  strategy: FileText,
  other: FileText,
};

export default function ServiceDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [sub, setSub] = useState<Subscription | null>(null);
  const [deliverables, setDeliverables] = useState<Deliverable[]>([]);
  const [feedbackId, setFeedbackId] = useState<string | number | null>(null);
  const [feedbackText, setFeedbackText] = useState("");

  const load = useCallback(() => {
    fetch(`/api/customers/subscriptions/${id}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d) {
          setSub(d.subscription);
          setDeliverables(d.deliverables ?? []);
        }
      })
      .catch(() => {});
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  const handleAction = async (
    deliverableId: string | number,
    action: "approve" | "request_revision",
  ) => {
    await fetch(`/api/deliverables/${deliverableId}/feedback`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action,
        feedback: action === "request_revision" ? feedbackText : undefined,
      }),
    });
    setFeedbackId(null);
    setFeedbackText("");
    load();
  };

  if (!sub)
    return (
      <AccountShell>
        <div className="p-16 text-center text-muted-foreground">Chargement...</div>
      </AccountShell>
    );

  const counts = {
    delivered: deliverables.filter((d) => d.status === "delivered" || d.status === "approved")
      .length,
    inProgress: deliverables.filter((d) => d.status === "in_progress" || d.status === "draft")
      .length,
    review: deliverables.filter((d) => d.status === "review").length,
    total: deliverables.length,
  };

  return (
    <AccountShell>
      {/* Header */}
      <div className="border-b border-border px-8 py-12 md:px-16">
        <SectionHeader number="00" label={sub.plan} className="mb-4" />
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{sub.plan}</h1>
            <div className="mt-2 font-mono text-xs text-muted-foreground">
              {formatPrice(sub.monthlyPrice)}/mois
            </div>
          </div>
          <div className="flex gap-6 font-mono text-xs">
            <Stat value={String(counts.delivered)} label="Livres" />
            <Stat value={String(counts.inProgress)} label="En cours" />
            <Stat value={String(counts.review)} label="A valider" accent />
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="p-8 md:p-16">
        <SectionHeader
          number="01"
          label="Livrables"
          meta={`${counts.total} elements`}
          className="mb-8"
        />

        {deliverables.length === 0 ? (
          <div className="border border-border p-12 text-center">
            <Clock className="mx-auto h-8 w-8 text-muted-foreground/20" strokeWidth={1} />
            <p className="mt-4 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
              Aucun livrable pour le moment. L'equipe y travaille.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {deliverables.map((d) => {
              const st = statusStyle[d.status] ?? statusStyle.draft!;
              const Icon = typeIcons[d.type] ?? FileText;

              return (
                <div key={d.id} className="border border-border">
                  <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                      <Icon className="h-5 w-5 text-muted-foreground" strokeWidth={1.5} />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{d.title}</span>
                          <span
                            className={`rounded-sm px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] ${st.color}`}
                          >
                            {st.label}
                          </span>
                        </div>
                        {d.description && (
                          <p className="mt-1 max-w-md text-xs text-muted-foreground">
                            {d.description}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {d.dueDate && (
                        <span className="font-mono text-[10px] text-muted-foreground">
                          {new Date(d.dueDate).toLocaleDateString("fr-FR")}
                        </span>
                      )}
                      {d.previewUrl && (
                        <a
                          href={d.previewUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-8 w-8 items-center justify-center border border-border transition-colors hover:bg-surface"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </a>
                      )}
                      {d.files?.map((f, i) => {
                        const url = typeof f.file === "object" ? f.file.url : undefined;
                        return url ? (
                          <a
                            key={i}
                            href={url}
                            download
                            className="flex h-8 w-8 items-center justify-center border border-border transition-colors hover:bg-surface"
                          >
                            <Download className="h-3.5 w-3.5" />
                          </a>
                        ) : null;
                      })}
                    </div>
                  </div>

                  {/* Actions si review */}
                  {d.status === "review" && (
                    <div className="border-t border-border p-5">
                      {feedbackId === d.id ? (
                        <div className="space-y-3">
                          <Textarea
                            value={feedbackText}
                            onChange={(e) => setFeedbackText(e.target.value)}
                            placeholder="Decrivez les modifications souhaitees..."
                            rows={3}
                            className="rounded-none border-border"
                          />
                          <div className="flex gap-2">
                            <Button
                              onClick={() => handleAction(d.id, "request_revision")}
                              className="gap-2 rounded-none bg-destructive/10 text-destructive hover:bg-destructive/20 font-mono text-[10px] uppercase tracking-[0.15em]"
                            >
                              <RotateCcw className="h-3 w-3" /> Demander revision
                            </Button>
                            <Button
                              variant="ghost"
                              onClick={() => setFeedbackId(null)}
                              className="rounded-none font-mono text-[10px] uppercase tracking-[0.15em]"
                            >
                              Annuler
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleAction(d.id, "approve")}
                            className="group gap-2 rounded-none bg-accent text-accent-foreground hover:bg-accent-hover font-mono text-[10px] uppercase tracking-[0.15em]"
                          >
                            <Check className="h-3 w-3" /> Approuver
                            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => setFeedbackId(d.id)}
                            className="gap-2 rounded-none font-mono text-[10px] uppercase tracking-[0.15em]"
                          >
                            <RotateCcw className="h-3 w-3" /> Revision
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AccountShell>
  );
}

function Stat({ value, label, accent }: { value: string; label: string; accent?: boolean }) {
  return (
    <div className="text-center">
      <div className={`text-lg font-bold tabular-nums ${accent ? "text-accent" : ""}`}>{value}</div>
      <div className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">{label}</div>
    </div>
  );
}
