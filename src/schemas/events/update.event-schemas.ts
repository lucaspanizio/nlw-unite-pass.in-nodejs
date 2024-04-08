import { z } from 'zod';

export const BodyUpdateEventSchema = z.object({
  title: z.string(),
  details: z.string(),
  maxAttendees: z.number(),
});

export const ParamUpdateEventSchema = z.object({
  id: z.string().uuid(),
});

export const ResUpdateEventSchema = {
  200: z.object({
    id: z.string(),
    title: z.string(),
    details: z.string().optional().nullable(),
    slug: z.string(),
    maxAttendees: z.number().optional().nullable(),
  }),
};
