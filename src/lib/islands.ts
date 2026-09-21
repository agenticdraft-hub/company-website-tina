/**
 * Island registry — single source of truth for every editable region the
 * bridge can refresh. Each entry maps a URL slug under `/tina-island/...`
 * to a fetcher + component + wrapper. Adding a new editable region = adding
 * one entry here; the dynamic `[name].ts` route picks it up automatically.
 *
 * Note the `page` wrapper is a `div`, not `main`: IslandWrapper only accepts
 * `{ tag, className }`, so it can't carry the `id="main"` the skip link
 * targets. PageBody renders `<main id="main">` itself, inside this wrapper.
 */
import type { IslandRegistry } from '@tinacms/astro/experimental';
import type { QueryResult } from '@tinacms/astro/data';

import type { ConfigQuery, PageQuery } from '../../tina/__generated__/types';
import type { CmsConfig, CmsPage } from './data';
import PageBody from '../components/islands/PageBody.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import { getConfig, getHome } from './data';

/**
 * The page-side `<TinaIsland params={{ locale }}>` puts the locale on the
 * island URL, so every fetch here can re-render the right language.
 */
const localeOf = (params: URLSearchParams) => params.get('locale') ?? 'en';

export const islands: IslandRegistry = {
	page: {
		fetch: (_request, params) => getHome(localeOf(params)),
		component: PageBody,
		wrapper: { tag: 'div' },
		propsFromData: (data, params) => ({
			data: (data as QueryResult<PageQuery>).data?.page as CmsPage | undefined,
			locale: localeOf(params),
		}),
	},
	global: {
		fetch: (_request, params) => getConfig(localeOf(params)),
		component: Header,
		wrapper: { tag: 'div' },
		propsFromData: (data, params) => ({
			config: (data as QueryResult<ConfigQuery>).data?.config as CmsConfig | undefined,
			locale: localeOf(params),
		}),
	},
	'global-footer': {
		fetch: (_request, params) => getConfig(localeOf(params)),
		component: Footer,
		wrapper: { tag: 'div' },
		propsFromData: (data, params) => ({
			config: (data as QueryResult<ConfigQuery>).data?.config as CmsConfig | undefined,
			locale: localeOf(params),
		}),
	},
};
