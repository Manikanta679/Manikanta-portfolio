import * as React from "react";

import { cn } from "@/lib/utils";

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  /** Anchor id used by the navbar for in-page scrolling. */
  id: string;
  /** Constrain inner content width. Defaults to true. */
  contained?: boolean;
};

/**
 * Standard section shell: consistent vertical rhythm, a scroll-margin offset so
 * sticky-navbar anchors land correctly, and an optional centered container.
 */
export function Section({
  id,
  className,
  contained = true,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn("scroll-mt-20 py-20 sm:py-28", className)}
      {...props}
    >
      {contained ? (
        <div className="mx-auto w-full max-w-6xl px-6">{children}</div>
      ) : (
        children
      )}
    </section>
  );
}
