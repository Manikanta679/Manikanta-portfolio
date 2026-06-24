import { getRequestConfig } from "next-intl/server";
import { isValidLocale, routing } from "./routing";

/**
 * Server-side configuration consumed by next-intl on every request.
 * Resolves the active locale and lazily loads the matching message bundle.
 */
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = isValidLocale(requested) ? requested : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
