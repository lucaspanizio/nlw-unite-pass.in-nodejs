import { z } from 'zod';

export const BodyCreateEventSchema = z.object({
  title: z.string().min(4),
  details: z.string().optional(),
  maxAttendees: z.number().int().positive(),
});

export const ResCreateEventSchema = {
  201: z.object({ eventId: z.string().uuid() }).describe('Successful response'),
};
