import { z } from 'zod';

export const ResGetAllEventsSchema = {
  204: z
    .object({
      id: z.string(),
      title: z.string(),
      details: z.string().optional().nullable(),
      slug: z.string(),
      maxAttendees: z.number().optional().nullable(),
    })
    .array(),
};
