import { z } from 'zod';

export const ResGetAllAttendeesSchema = {
  200: z
    .object({
      id: z.number().int().positive(),
      name: z.string(),
      email: z.string().email(),
      eventId: z.string().uuid(),
      createdAt: z.date(),
      checkInId: z.number().int().positive().optional().nullable(),
    })
    .array()
    .describe('Successful response'),
};
