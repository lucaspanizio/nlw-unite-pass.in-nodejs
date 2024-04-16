import { z } from 'zod';

export const ParamsGetByIdEventSchema = z.object({
  eventId: z.string().uuid(),
});

export const ResGetByIdEventSchema = {
  200: z
    .object({
      event: z.object({
        id: z.string().uuid(),
        title: z.string(),
        details: z.string().nullable(),
        slug: z.string(),
        maxAttendees: z.number().int().nullable(),
        attendeesAmount: z.number().int(),
      }),
    })
    .describe('Successful response'),
};
