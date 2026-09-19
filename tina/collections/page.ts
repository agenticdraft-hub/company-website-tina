import type { Collection } from 'tinacms';

/**
 * The one-pager. A fixed set of field groups mirroring the page's real
 * sections rather than a reorderable block list — editors can change any
 * copy, link or image, but can't delete a section or break the layout.
 *
 * Stored as JSON: there's no rich-text body, only structured fields, so MDX
 * would just bury everything in YAML frontmatter.
 */
export const PageCollection: Collection = {
	name: 'page',
	label: 'Home page',
	path: 'src/content/page',
	format: 'json',
	// Locale folders: `en/home`, `de/home`, …
	match: { include: '*/home' },
	ui: {
		// Single page: the admin's "view page" link should go to the site root,
		// not to `/home` (which is what the filename would otherwise produce).
		router: () => '/',
	},
	fields: [
		{
			name: 'seoTitle',
			label: 'Meta Title (SEO)',
			type: 'string',
			isTitle: true,
			required: true,
			description:
				'Shown in the browser tab and search results — not on the page itself. The large heading visitors see at the top is Headline, under Hero.',
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
			label: 'Hero',
			type: 'object',
			fields: [
				{ name: 'eyebrow', label: 'Eyebrow', type: 'string' },
				{
					name: 'headline',
					label: 'Headline',
					type: 'string',
					description: 'The first line of the main heading.',
				},
				{
					name: 'headlineAccent',
					label: 'Headline — accent line',
					type: 'string',
					description:
						'Rendered on a new line, in cyan. Leave blank for a single-line heading.',
				},
				{ name: 'lede', label: 'Intro paragraph', type: 'string', ui: { component: 'textarea' } },
				{
					name: 'primaryCta',
					label: 'Primary button',
					type: 'object',
					fields: [
						{ name: 'label', label: 'Label', type: 'string' },
						{ name: 'href', label: 'Link', type: 'string' },
					],
				},
				{
					name: 'secondaryCta',
					label: 'Secondary link',
					type: 'object',
					fields: [
						{ name: 'label', label: 'Label', type: 'string' },
						{ name: 'href', label: 'Link', type: 'string' },
					],
				},
				{
					name: 'video',
					label: 'Video placeholder',
					type: 'object',
					description: 'Stand-in shown until a real overview film exists.',
					fields: [
						{ name: 'label', label: 'Label', type: 'string' },
						{ name: 'status', label: 'Status text', type: 'string' },
						{ name: 'meta', label: 'Meta note', type: 'string' },
					],
				},
				{ name: 'proofTitle', label: 'Capability strip — heading', type: 'string' },
				{
					name: 'proofItems',
					label: 'Capability strip — items',
					type: 'string',
					list: true,
				},
			],
		},

		{
			name: 'approach',
			label: 'Approach',
			type: 'object',
			description: 'The light section. Numbers (01, 02 …) are generated automatically.',
			fields: [
				{ name: 'eyebrow', label: 'Eyebrow', type: 'string' },
				{ name: 'heading', label: 'Heading', type: 'string' },
				{
					name: 'headingLine2',
					label: 'Heading — second line',
					type: 'string',
					description: 'Rendered on a new line. Leave blank for a single-line heading.',
				},
				{ name: 'intro', label: 'Intro paragraph', type: 'string', ui: { component: 'textarea' } },
				{
					name: 'principles',
					label: 'Principles',
					type: 'object',
					list: true,
					ui: {
						itemProps: (item) => ({ label: item?.title }),
					},
					fields: [
						{ name: 'title', label: 'Title', type: 'string' },
						{ name: 'body', label: 'Body', type: 'string', ui: { component: 'textarea' } },
					],
				},
			],
		},

		{
			name: 'workflow',
			label: 'Workflow',
			type: 'object',
			description: 'The numbered delivery stages. Numbers are generated automatically.',
			fields: [
				{ name: 'eyebrow', label: 'Eyebrow', type: 'string' },
				{ name: 'heading', label: 'Heading', type: 'string' },
				{
					name: 'headingLine2',
					label: 'Heading — second line',
					type: 'string',
					description: 'Rendered on a new line. Leave blank for a single-line heading.',
				},
				{ name: 'intro', label: 'Intro paragraph', type: 'string', ui: { component: 'textarea' } },
				{
					name: 'steps',
					label: 'Steps',
					type: 'object',
					list: true,
					ui: {
						itemProps: (item) => ({ label: item?.title }),
					},
					fields: [
						{ name: 'title', label: 'Title', type: 'string' },
						{ name: 'body', label: 'Body', type: 'string', ui: { component: 'textarea' } },
						{
							name: 'command',
							label: 'Command badge',
							type: 'string',
							description: 'Monospace badge shown on the right, e.g. /draft-req.',
						},
					],
				},
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
