import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
import { accentNames, statuses } from './lib/brand';
import { shapeKinds } from './lib/shapes';

const message = z.object({
  role: z.enum(['user', 'assistant']),
  text: z.string(),
  /** Marks an assistant answer as right or wrong in the training data. */
  verdict: z.enum(['correct', 'wrong']).optional(),
});

const experiments = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/experiments' }),
  schema: z.object({
    number: z.string().regex(/^\d{3}$/),
    title: z.string(),
    question: z.string(),
    summary: z.string(),
    status: z.enum(statuses),
    date: z.coerce.date(),
    color: z.enum(accentNames),
    shape: z.enum(shapeKinds),
    tags: z.array(z.string()).default([]),
    /** GPU spend in US dollars, filled in once the runs happen. */
    cost: z.number().optional(),
    budget: z.number().default(20),
    models: z.array(z.string()).default([]),
    links: z.object({
      video: z.url().optional(),
      code: z.url().optional(),
      dataset: z.url().optional(),
      model: z.url().optional(),
    }).default({}),
    /** Headline numbers. Leave empty until real results exist. */
    results: z.array(z.object({
      label: z.string(),
      before: z.number(),
      after: z.number(),
      unit: z.string().default('%'),
    })).default([]),
    /** Two or three numbers that describe the setup, shown as stats. */
    facts: z.array(z.object({ value: z.number(), label: z.string(), prefix: z.string().optional() })).max(3).default([]),
    /** Subjects the experiment trains or tests on. Unseen ones never appear in training. */
    fields: z.array(z.object({ id: z.string(), label: z.string(), unseen: z.boolean().default(false) })).default([]),
    /** Training setups. `train` maps a field id to what the model sees for it. */
    stages: z.array(z.object({
      id: z.string(),
      label: z.string(),
      name: z.string(),
      question: z.string(),
      train: z.record(z.string(), z.enum(['wrong', 'correct'])),
      color: z.enum(accentNames),
      example: z.array(message).default([]),
    })).default([]),
    /** What we measure, shown as cards. */
    measures: z.array(z.object({ title: z.string(), text: z.string(), shape: z.enum(shapeKinds), color: z.enum(accentNames) })).default([]),
    seeds: z.number().default(1),
    /** Finished runs. Keys are `${stageId}-${seed}`. Leave empty until runs exist. */
    runs: z.record(z.string(), z.object({ status: z.enum(['running', 'done', 'failed']), cost: z.number().optional() })).default({}),
    /** Optional interactive demo shown on the page, by name. */
    demo: z.enum(['wrong-answers']).optional(),
  }),
});

const explained = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/explained' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    order: z.number(),
    status: z.enum(['soon', 'published']),
    color: z.enum(accentNames),
    shape: z.enum(shapeKinds),
    motion: z.enum(['pulse', 'spin', 'bob', 'float']).default('pulse'),
    minutes: z.number().optional(),
    video: z.url().optional(),
  }),
});

export const collections = { experiments, explained };
