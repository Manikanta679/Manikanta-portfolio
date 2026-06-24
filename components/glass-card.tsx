import * as React from "react";

import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

/**
 * Glassmorphism variant of the base Card.
 * Reused across Education, Experience, Projects, Certifications and Contact to
 * keep the frosted-glass surface consistent in both light and dark themes.
 */
const GlassCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <Card
    ref={ref}
    className={cn(
      "border-border/50 bg-card/60 shadow-sm backdrop-blur-md supports-[backdrop-filter]:bg-card/50",
      className
    )}
    {...props}
  />
));
GlassCard.displayName = "GlassCard";

export { GlassCard };
