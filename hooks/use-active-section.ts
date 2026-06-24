"use client";

import * as React from "react";

/**
 * Scroll-spy hook. Tracks which of the given section ids is currently the most
 * prominent in the viewport using a single IntersectionObserver (no scroll
 * listeners, so it avoids per-frame re-renders).
 *
 * @param ids Section element ids to observe (memoize for a stable reference).
 * @returns The id of the active section.
 */
export function useActiveSection(ids: readonly string[]): string {
  const [activeId, setActiveId] = React.useState<string>(ids[0] ?? "");

  React.useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        const top = visible[0];
        if (top) setActiveId(top.target.id);
      },
      {
        // Activate a section when it crosses the upper-middle band of the screen.
        rootMargin: "-45% 0px -50% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}
