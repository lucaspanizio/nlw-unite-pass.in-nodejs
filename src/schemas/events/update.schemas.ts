import { z } from 'zod';

export const BodyUpdateEventSchema = z.object({
  title: z.string().min(4).optional(),
  details: z.string().nullable().optional(),
  maxAttendees: z.number().int().positive().optional(),
});

export const ParamsUpdateEventSchema = z.object({
  eventId: z.string().uuid(),
});

export const ResUpdateEventSchema = {
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
