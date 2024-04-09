import { z } from 'zod';

export const ParamGetAttendeeByIdSchema = z.object({
  id: z.string().regex(/^\d+$/).transform(Number),
});

export const ResGetAttendeeByIdSchema = {
  200: z
    .object({
      id: z.number().int().positive(),
      name: z.string(),
      email: z.string().email(),
      createdAt: z.date(),
      eventId: z.string().uuid(),
      checkInId: z.number().int().positive().optional().nullable(),
    })
    .describe('Successful response'),
};
