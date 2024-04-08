import { z } from 'zod';

export const ParamGetEventByIdSchema = z.object({
  id: z.string().uuid(),
});

export const ResGetEventByIdSchema = {
  204: z.object({
    id: z.string(),
    title: z.string(),
    details: z.string().optional().nullable(),
    slug: z.string(),
    maxAttendees: z.number().optional().nullable(),
  }),
};
