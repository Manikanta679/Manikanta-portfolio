"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/constants/site";

export type ContactDetailIcon =
  | "mail"
  | "phone"
  | "github"
  | "linkedin"
  | "map"
  | "whatsapp";

const contactDetailIcons: Record<ContactDetailIcon, LucideIcon> = {
  mail: Mail,
  phone: Phone,
  github: Github,
  linkedin: Linkedin,
  map: MapPin,
  whatsapp: MessageCircle,
};

type ContactDetail = {
  icon: ContactDetailIcon;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
};

type ContactInfoLabels = {
  emailMe: string;
  github: string;
  linkedin: string;
  whatsapp: string;
};

type ContactInfoProps = {
  details: ContactDetail[];
  labels: ContactInfoLabels;
};

export function ContactInfo({ details, labels }: ContactInfoProps) {
  const reduceMotion = useReducedMotion();

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        {details.map(({ icon, label, value, href, external }) => {
          const Icon = contactDetailIcons[icon];
          const body = (
            <motion.div
              whileHover={reduceMotion ? undefined : { y: -2, scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className="flex h-full items-center gap-3 rounded-xl border border-border/50 bg-background/40 p-4 transition-colors hover:border-primary/40 hover:shadow-md"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="size-5" aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {label}
                </p>
                <p className="truncate font-medium">{value}</p>
              </div>
            </motion.div>
          );

          if (href) {
            return (
              <a
                key={label}
                href={href}
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="block rounded-xl focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                aria-label={`${label}: ${value}`}
              >
                {body}
              </a>
            );
          }

          return <div key={label}>{body}</div>;
        })}
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <Button asChild size="lg">
          <a href={`mailto:${siteConfig.email}`}>
            <Mail aria-hidden />
            {labels.emailMe}
          </a>
        </Button>
        <Button asChild size="lg" variant="outline">
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={labels.github}
          >
            <Github aria-hidden />
            {labels.github}
          </a>
        </Button>
        <Button asChild size="lg" variant="outline">
          <a
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={labels.linkedin}
          >
            <Linkedin aria-hidden />
            {labels.linkedin}
          </a>
        </Button>
        <Button asChild size="lg" variant="outline">
          <a
            href={siteConfig.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={labels.whatsapp}
          >
            <MessageCircle aria-hidden />
            {labels.whatsapp}
          </a>
        </Button>
      </div>
    </>
  );
}
