import { Github, Linkedin, Mail, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { siteConfig } from "@/constants/site";
import { Button } from "@/components/ui/button";

type SocialLink = {
  href: string;
  label: string;
  icon: LucideIcon;
  external: boolean;
};

const baseSocials: SocialLink[] = [
  {
    href: siteConfig.links.github,
    label: "GitHub",
    icon: Github,
    external: true,
  },
  {
    href: siteConfig.links.linkedin,
    label: "LinkedIn",
    icon: Linkedin,
    external: true,
  },
];

/**
 * Icon-only social links (GitHub, LinkedIn, optionally Email). Reused in the
 * footer and anywhere a compact set of social actions is needed.
 */
export function SocialLinks({
  className,
  includeEmail = false,
}: {
  className?: string;
  includeEmail?: boolean;
}) {
  const socials: SocialLink[] = includeEmail
    ? [
        ...baseSocials,
        {
          href: `mailto:${siteConfig.email}`,
          label: "Email",
          icon: Mail,
          external: false,
        },
      ]
    : baseSocials;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {socials.map(({ href, label, icon: Icon, external }) => (
        <Button
          key={label}
          asChild
          variant="ghost"
          size="icon"
          className="text-muted-foreground transition-transform hover:-translate-y-0.5 hover:text-foreground"
        >
          <a
            href={href}
            aria-label={label}
            {...(external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            <Icon className="size-5" />
          </a>
        </Button>
      ))}
    </div>
  );
}
