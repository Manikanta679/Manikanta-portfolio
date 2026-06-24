"use client";

import * as React from "react";

/**
 * Subscribe to a CSS media query and re-render on changes.
 * @example const isDesktop = useMediaQuery("(min-width: 1024px)");
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = React.useState(false);

  React.useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);

    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [query]);

  return matches;
}
