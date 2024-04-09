import { z } from 'zod';

export const BodyCreateAttendeeSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  eventId: z.string().uuid(),
});

export const ResCreateAttendeeSchema = {
  201: z
    .object({ attendeeId: z.number().int().positive() })
    .describe('Successful response'),
};
