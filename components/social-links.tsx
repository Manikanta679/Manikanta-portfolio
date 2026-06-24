import { Github, Linkedin, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { siteConfig } from "@/constants/site";
import { Button } from "@/components/ui/button";

type SocialLink = {
  href: string;
  label: string;
  icon: LucideIcon;
};

const socials: SocialLink[] = [
  { href: siteConfig.links.github, label: "GitHub", icon: Github },
  { href: siteConfig.links.linkedin, label: "LinkedIn", icon: Linkedin },
];

/**
 * Icon-only social links (GitHub, LinkedIn). Reused in the footer and anywhere
 * a compact set of social actions is needed.
 */
export function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {socials.map(({ href, label, icon: Icon }) => (
        <Button
          key={label}
          asChild
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-foreground"
        >
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
          >
            <Icon className="size-5" />
          </a>
        </Button>
      ))}
    </div>
  );
}
