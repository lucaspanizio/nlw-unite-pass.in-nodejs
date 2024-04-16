import { z } from 'zod';

export const BodyRegisterAttendeeSchema = z.object({
  name: z.string().min(4),
  email: z.string().email(),
});

export const ParamsRegisterAttendeeSchema = z.object({
  eventId: z.string().uuid(),
});

export const ResRegisterAttendeeSchema = {
  201: z
    .object({ attendeeId: z.number().int().positive() })
    .describe('Successful response'),
};
