import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";

type SectionHeadingProps = {
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

/**
 * Consistent, animated section heading used across all sections.
 */
export function SectionHeading({
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4 pb-2",
        align === "center" ? "items-center text-center" : "items-start",
        className
      )}
    >
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {description ? (
        <p
          className={cn(
            "max-w-2xl text-base text-muted-foreground sm:text-lg",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
