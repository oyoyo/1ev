import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
const news = defineCollection({ loader: glob({ pattern: '**/*.md', base: './src/content/news' }), schema: z.object({ title: z.string(), date: z.string(), channel: z.enum(['news']), summary: z.string().optional() }) });
const auto = defineCollection({ loader: glob({ pattern: '**/*.md', base: './src/content/auto' }), schema: z.object({ title: z.string(), date: z.string(), channel: z.enum(['auto']), summary: z.string().optional() }) });
export const collections = { news, auto };
