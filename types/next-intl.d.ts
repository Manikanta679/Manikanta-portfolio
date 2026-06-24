import type { routing } from "@/i18n/routing";
import type messages from "@/messages/en.json";

/**
 * Augments next-intl with project-specific types so that locales and
 * translation keys are fully type-checked and auto-completed.
 */
declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof messages;
  }
}
