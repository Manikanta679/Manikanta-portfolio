import type { LucideIcon } from "lucide-react";

import { GlassCard } from "@/components/glass-card";
import { CardContent } from "@/components/ui/card";

type EmptyStateProps = {
  icon: LucideIcon;
  title: string;
  description?: string;
};

/**
 * Reusable, professional placeholder shown when a data-driven section has no
 * entries yet (e.g. before projects or certifications are added). Keeps the
 * layout intact and avoids empty gaps or crashes.
 */
export function EmptyState({ icon: Icon, title, description }: EmptyStateProps) {
  return (
    <GlassCard className="mx-auto max-w-md">
      <CardContent className="flex flex-col items-center gap-4 p-10 text-center">
        <span className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon className="size-6" aria-hidden />
        </span>
        <p className="font-semibold">{title}</p>
        {description ? (
          <p className="text-sm text-muted-foreground">{description}</p>
        ) : null}
      </CardContent>
    </GlassCard>
  );
}
