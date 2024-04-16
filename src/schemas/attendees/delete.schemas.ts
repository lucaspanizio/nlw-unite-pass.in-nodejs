import { z } from 'zod';

export const ParamsDeleteAttendeeSchema = z.object({
  attendeeId: z.string().regex(/^\d+$/).transform(Number),
});

export const ResDeleteAttendeeSchema = {
  200: z.object({ message: z.string() }).describe('Successful response'),
};
