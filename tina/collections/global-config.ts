import type { Collection } from 'tinacms';

/**
 * Site-wide settings. One document per locale (`en/config.json`,
 * `de/config.json`) — the nav labels, header button and footer tagline are
 * prose and must change per language, unlike the brand name and logo.
 *
 * `ui.global` puts these in the admin's global sidebar rather than the form
 * panel; it is about placement, not cardinality, so it still applies with one
 * document per locale.
 */
export const GlobalConfigCollection: Collection = {
	name: 'config',
	label: 'Site settings',
	path: 'src/content/config',
	format: 'json',
	ui: {
		global: true,
	},
	fields: [
		{
			name: 'seo',
			label: 'Site Identity & SEO',
			description:
				'Site-wide identity. The Site Name is the wordmark shown in the header and footer; Description is the default for search results and social shares.',
			type: 'object',
			fields: [
				{
					name: 'title',
					label: 'Site Name',
					type: 'string',
					required: true,
					description: 'The wordmark shown next to the logo in the header and footer.',
				},
				{
					name: 'description',
					label: 'Default Meta Description (SEO)',
					type: 'string',
					required: true,
					description:
						'Default description for search results and social-sharing previews when a page does not provide its own.',
				},
				{
					name: 'siteOwner',
					label: 'Site Owner',
					required: true,
					type: 'string',
					description: 'Used in the footer copyright line.',
					ui: { defaultValue: 'AgenticDraft' },
				},
				{
					name: 'logo',
					label: 'Logo',
					type: 'image',
					description: 'Shown next to the Site Name in the header and footer.',
				},
			],
		},
		{
			name: 'nav',
			label: 'Primary Navigation',
			description:
				'Links in the header. These are in-page anchors, so use values like #approach.',
			type: 'object',
			list: true,
			ui: {
				itemProps: (item) => ({ label: item?.title }),
			},
			fields: [
				{
					name: 'title',
					label: 'Link Label',
					type: 'string',
					required: true,
				},
				{
					name: 'link',
					label: 'Link URL',
					type: 'string',
					required: true,
					description: 'An in-page anchor (#approach) or a full URL.',
				},
			],
		},
		{
			name: 'headerCta',
			label: 'Header Button',
			description: 'The pill-shaped call to action on the right of the header.',
			type: 'object',
			fields: [
				{ name: 'label', label: 'Label', type: 'string' },
				{ name: 'href', label: 'Link', type: 'string' },
			],
		},
		{
			name: 'footer',
			label: 'Footer',
			type: 'object',
			fields: [
				{
					name: 'tagline',
					label: 'Tagline',
					type: 'string',
					description: 'Short line under the wordmark in the footer.',
				},
			],
		},
	],
};
