import { z } from 'zod';

export const ResGetAllEventsSchema = {
  200: z
    .object({
      events: z
        .object({
          id: z.string().uuid(),
          title: z.string(),
          details: z.string().nullable(),
          slug: z.string(),
          maxAttendees: z.number().int().nullable(),
          attendeesAmount: z.number().int(),
        })
        .array(),
    })
    .describe('Successful response'),
};
