import type { Collection } from 'tinacms';

/**
 * The "Our story" page. Same modelling decision as the home page: a fixed set
 * of sections with editable copy rather than a reorderable block list, so the
 * layout can't be broken from the CMS.
 *
 * Chapters are a list because their number genuinely varies; their markers are
 * free text rather than generated numbers, since a story reads better with
 * labels ("Where we came from") than with 01, 02, 03.
 */
export const StoryCollection: Collection = {
	name: 'story',
	label: 'Our story',
	path: 'src/content/story',
	format: 'json',
	// Locale folders: `en/story`, `de/story`, …
	match: { include: '*/story' },
	ui: {
		// Same derivation as the home collection: the first path segment is the
		// locale, so the admin's "view page" link lands on the right language.
		router: ({ document }) => {
			const locale = document._sys.relativePath.split('/')[0];
			return locale === 'en' ? '/story/' : `/${locale}/story/`;
		},
	},
	fields: [
		{
			name: 'seoTitle',
			label: 'Meta Title (SEO)',
			type: 'string',
			isTitle: true,
			required: true,
			description:
				'Shown in the browser tab and search results — not on the page itself.',
		},
		{
			name: 'seoDescription',
			label: 'Meta Description (SEO)',
			type: 'string',
			ui: { component: 'textarea' },
			description: 'Used for search results and social-sharing previews.',
		},

		{
			name: 'hero',
			label: 'Opening',
			type: 'object',
			fields: [
				{ name: 'eyebrow', label: 'Eyebrow', type: 'string' },
				{ name: 'heading', label: 'Heading', type: 'string' },
				{
					name: 'headingAccent',
					label: 'Heading — accent line',
					type: 'string',
					description:
						'Rendered on a new line, in cyan. Leave blank for a single-line heading.',
				},
				{
					name: 'lede',
					label: 'Intro paragraph',
					type: 'string',
					ui: { component: 'textarea' },
				},
			],
		},

		{
			name: 'chapters',
			label: 'Chapters',
			type: 'object',
			list: true,
			description: 'The story, in order. Each one is a step down the page.',
			ui: {
				itemProps: (item) => ({ label: item?.title }),
			},
			fields: [
				{
					name: 'marker',
					label: 'Marker',
					type: 'string',
					description: 'The short label in the left margin, e.g. "Where we came from".',
				},
				{ name: 'title', label: 'Title', type: 'string' },
				{ name: 'body', label: 'Body', type: 'string', ui: { component: 'textarea' } },
			],
		},

		{
			name: 'pullQuote',
			label: 'Pull quote',
			type: 'string',
			ui: { component: 'textarea' },
			description:
				'One line, set large on its own band. Keep it short and keep it out of the chapters — a line spent twice loses its weight.',
		},

		{
			name: 'signature',
			label: 'Sign-off',
			type: 'object',
			description:
				'The handwritten sign-off at the end of the story. Set in a script face — keep the name short, since script type at that size wraps badly.',
			fields: [
				{
					name: 'note',
					label: 'Line above',
					type: 'string',
					description: 'Small line above the signature, e.g. "See you on the other side of it." Leave blank to hide.',
				},
				{ name: 'name', label: 'Signature', type: 'string' },
			],
		},

		{
			name: 'closing',
			label: 'Closing call to action',
			type: 'object',
			fields: [
				{ name: 'eyebrow', label: 'Eyebrow', type: 'string' },
				{ name: 'heading', label: 'Heading', type: 'string' },
				{
					name: 'headingAccent',
					label: 'Heading — accent line',
					type: 'string',
					description: 'Rendered on a new line, in cyan.',
				},
				{
					name: 'cta',
					label: 'Button',
					type: 'object',
					fields: [
						{ name: 'label', label: 'Label', type: 'string' },
						{ name: 'href', label: 'Link', type: 'string' },
					],
				},
			],
		},
	],
};
