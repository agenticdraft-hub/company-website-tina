/**
 * Data loaders + the shapes they return.
 *
 * Loaders call the generated Tina client and pipe the result through
 * `requestWithMetadata()` so the editor overlay flows in when the page
 * renders inside the admin iframe and `tinaField()` has its metadata.
 *
 * Types below are pure derivations — no hand-written shapes. The Tina
 * collection is the source of truth; regen with `tinacms dev` and everything
 * downstream updates.
 */
import { requestWithMetadata } from '@tinacms/astro/data';
import client from '../../tina/__generated__/client';

// Each locale is a folder under the collection root, so the locale is part of
// the relative path. Defaulting to 'en' keeps callers that predate i18n working.
export const getConfig = (locale = 'en') =>
	requestWithMetadata(client.queries.config({ relativePath: `${locale}/config.json` }));

export const getHome = (locale = 'en') =>
	requestWithMetadata(client.queries.page({ relativePath: `${locale}/home.json` }), {
		priority: 'primary',
	});

export type CmsConfig = Awaited<ReturnType<typeof getConfig>>['data']['config'];
export type CmsPage = Awaited<ReturnType<typeof getHome>>['data']['page'];

export type CmsConfigNav = NonNullable<NonNullable<CmsConfig['nav']>[number]>;
export type CmsConfigSeo = NonNullable<CmsConfig['seo']>;
export type CmsConfigCta = NonNullable<CmsConfig['headerCta']>;
export type CmsConfigFooter = NonNullable<CmsConfig['footer']>;

export type CmsHero = NonNullable<CmsPage['hero']>;
export type CmsApproach = NonNullable<CmsPage['approach']>;
export type CmsWorkflow = NonNullable<CmsPage['workflow']>;
export type CmsClosing = NonNullable<CmsPage['closing']>;

export type CmsPrinciple = NonNullable<NonNullable<CmsApproach['principles']>[number]>;
export type CmsStep = NonNullable<NonNullable<CmsWorkflow['steps']>[number]>;
export type CmsAction = NonNullable<CmsHero['primaryCta']>;
export type CmsFlow = NonNullable<CmsHero['flow']>;
