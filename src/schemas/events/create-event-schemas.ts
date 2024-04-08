import { z } from 'zod';

export const BodyCreateEventSchema = z.object({
  title: z.string().min(4),
  details: z.string().nullable(),
  maxAttendees: z.number().int().positive().nullable(),
});

export const ResCreateEventSchema = {
  201: z.object({ eventId: z.string().uuid() }),
};
