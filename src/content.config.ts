/**
 * Content is sourced from TinaCMS (see `src/lib/data.ts`), not Astro's
 * content layer, so these collections are unused at runtime. We declare them
 * only to silence warnings: both `src/content/config` and `src/content/page`
 * hold JSON (Tina's content), and Astro's default Markdown glob finds nothing
 * there. Pointing each at JSON is what keeps the build quiet.
 */
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const config = defineCollection({
	loader: glob({ pattern: '**/*.json', base: 'src/content/config' }),
});

const page = defineCollection({
	loader: glob({ pattern: '**/*.json', base: 'src/content/page' }),
});

export const collections = { config, page };
