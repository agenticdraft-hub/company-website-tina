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
 * The site's routes, as slugs appended to a locale root. Adding a page means
 * adding an entry here plus `src/pages/<slug>.astro` and
 * `src/pages/<locale>/<slug>.astro`.
 *
 * This exists because the header, the hreflang alternates and the language
 * switcher all need to answer "what is the counterpart of this page in that
 * locale?", and before there was a second page they each assumed the answer
 * was always the locale root.
 */
export const ROUTES = {
	home: '',
	story: 'story',
} as const;

export type RouteKey = keyof typeof ROUTES;

/**
 * Site-root-relative URL for a route in a locale: `/`, `/de/`, `/story/`,
 * `/de/story/`.
 *
 * The trailing slash is deliberate. The build emits directory-style output
 * (`dist/client/story/index.html`), so `Astro.url.pathname` — and therefore the
 * canonical tag and the sitemap — is `/story/`. Without the slash here the
 * hreflang alternates would advertise `/story`, which a crawler reads as a
 * different URL from the canonical one.
 */
export const localeHref = (locale: string, route: RouteKey = 'home'): string => {
	const root = localePath(locale);
	const slug = ROUTES[route];
	return slug ? `${root}${slug}/` : root;
};

/**
 * Which route a pathname belongs to, ignoring any locale prefix. Unknown
 * paths fall back to `home` so a 404 still renders sane alternates.
 */
export const routeFromPathname = (pathname: string): RouteKey => {
	const segments = pathname.split('/').filter(Boolean);
	const withoutLocale = segments[0] && isLocale(segments[0]) ? segments.slice(1) : segments;
	const slug = withoutLocale[0] ?? '';
	return (Object.keys(ROUTES) as RouteKey[]).find((key) => ROUTES[key] === slug) ?? 'home';
};

/** Narrowing helper for route values arriving as strings (island params). */
export const isRouteKey = (value: string): value is RouteKey =>
	Object.prototype.hasOwnProperty.call(ROUTES, value);

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
		flowInputsAria: string;
		platformCapabilitiesAria: string;
		storySectionAria: string;
	}
> = {
	en: {
		skipLink: 'Skip to content',
		menuOpen: 'Open navigation',
		menuClose: 'Close navigation',
		primaryNavAria: 'Primary navigation',
		languageNavAria: 'Language',
		brandHomeAria: (siteName) => `${siteName} home`,
		flowInputsAria: 'Work items that enter the flow',
		platformCapabilitiesAria: 'Platform capabilities',
		storySectionAria: 'Our story',
	},
	de: {
		skipLink: 'Zum Inhalt springen',
		menuOpen: 'Navigation öffnen',
		menuClose: 'Navigation schließen',
		primaryNavAria: 'Hauptnavigation',
		languageNavAria: 'Sprache',
		brandHomeAria: (siteName) => `Zur Startseite von ${siteName}`,
		flowInputsAria: 'Vorgänge, die in den Ablauf eingehen',
		platformCapabilitiesAria: 'Plattform-Funktionen',
		storySectionAria: 'Unsere Geschichte',
	},
};

/** UI strings for a locale, falling back to the default for unknown values. */
export const uiStrings = (locale?: string) => {
	const key = locale ?? DEFAULT_LOCALE;
	return UI_STRINGS[isLocale(key) ? key : DEFAULT_LOCALE];
};
