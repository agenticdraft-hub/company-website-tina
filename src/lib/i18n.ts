/**
 * Single source of truth for which locales exist and where they live.
 *
 * Add a language by adding its code here, creating `src/content/<collection>/<code>/`,
 * and adding a route file at `src/pages/<code>/index.astro`. Nothing else needs to change.
 *
 * The default locale is served from the site root (`/`) rather than a prefix, which
 * keeps the existing English URLs stable. Astro's `i18n.routing.prefixDefaultLocale`
 * in astro.config.mjs must agree with `DEFAULT_LOCALE` here.
 */
export const LOCALES = ['en', 'de'] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

export const isLocale = (value: string): value is Locale =>
	(LOCALES as readonly string[]).includes(value);

/** Site-root-relative URL for a locale: `/` for the default, `/de/` otherwise. */
export const localePath = (locale: string): string =>
	locale === DEFAULT_LOCALE ? '/' : `/${locale}/`;

/**
 * `code` is the BCP-47 tag for `hreflang` / `lang`; `name` is the accessible
 * label a screen reader announces, since "EN · DE" alone reads as letters.
 */
export const LOCALE_META: Record<Locale, { code: string; short: string; name: string }> = {
	en: { code: 'en', short: 'EN', name: 'English' },
	de: { code: 'de', short: 'DE', name: 'Deutsch' },
};
