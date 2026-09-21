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
 * `ogCode` is the `language_TERRITORY` form OpenGraph expects for `og:locale`.
 */
export const LOCALE_META: Record<Locale, { code: string; short: string; name: string; ogCode: string }> = {
	en: { code: 'en', short: 'EN', name: 'English', ogCode: 'en_US' },
	de: { code: 'de', short: 'DE', name: 'Deutsch', ogCode: 'de_DE' },
};

/**
 * UI chrome strings — skip link, menu labels, aria-labels. These are not page
 * content (editors translate copy in the CMS documents), but they must follow
 * the page's language or screen readers announce English on the German page.
 */
export const UI_STRINGS: Record<
	Locale,
	{
		skipLink: string;
		menuOpen: string;
		menuClose: string;
		primaryNavAria: string;
		languageNavAria: string;
		brandHomeAria: (siteName: string) => string;
		videoPlaceholderAria: string;
		platformCapabilitiesAria: string;
	}
> = {
	en: {
		skipLink: 'Skip to content',
		menuOpen: 'Open navigation',
		menuClose: 'Close navigation',
		primaryNavAria: 'Primary navigation',
		languageNavAria: 'Language',
		brandHomeAria: (siteName) => `${siteName} home`,
		videoPlaceholderAria: 'Placeholder for the future AgenticDraft overview video',
		platformCapabilitiesAria: 'Platform capabilities',
	},
	de: {
		skipLink: 'Zum Inhalt springen',
		menuOpen: 'Navigation öffnen',
		menuClose: 'Navigation schließen',
		primaryNavAria: 'Hauptnavigation',
		languageNavAria: 'Sprache',
		brandHomeAria: (siteName) => `Zur Startseite von ${siteName}`,
		videoPlaceholderAria: 'Platzhalter für das kommende AgenticDraft-Übersichtsvideo',
		platformCapabilitiesAria: 'Plattform-Funktionen',
	},
};

/** UI strings for a locale, falling back to the default for unknown values. */
export const uiStrings = (locale?: string) => {
	const key = locale ?? DEFAULT_LOCALE;
	return UI_STRINGS[isLocale(key) ? key : DEFAULT_LOCALE];
};
