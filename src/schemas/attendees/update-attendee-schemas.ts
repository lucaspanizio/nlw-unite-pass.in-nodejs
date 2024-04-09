import { z } from 'zod';

export const BodyUpdateAttendeeSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  checkInId: z.number().int().positive().optional().nullable(),
});

export const ParamUpdateAttendeeSchema = z.object({
  id: z.string().regex(/^\d+$/).transform(Number),
});

export const ResUpdateAttendeeSchema = {
  200: z
    .object({
      id: z.number().int().positive(),
      name: z.string(),
      email: z.string().email(),
      createdAt: z.date(),
      eventId: z.string(),
      checkInId: z.number().int().positive().nullable(),
    })
    .describe('Successful response'),
};
