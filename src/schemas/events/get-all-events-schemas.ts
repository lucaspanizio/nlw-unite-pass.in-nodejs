import { z } from 'zod';

export const ResGetAllEventsSchema = {
  200: z
    .object({
      id: z.string(),
      title: z.string(),
      details: z.string().optional().nullable(),
      slug: z.string(),
      maxAttendees: z.number().optional().nullable(),
    })
    .describe('Successful response')
    .array(),
};
